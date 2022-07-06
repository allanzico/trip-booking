import React, { useEffect, useState } from "react";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import {
  getSingleExperience,
  updateExperience,
} from "../../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchSingleExperience } from "../../Redux/reducers/experiences";
import TicketData from "../steps/TicketData";
import ExperienceData from "../steps/ExperienceData";
import moment from "moment";

const EditExperience = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const source = axios.CancelToken.source();
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    lat: "",
    lng: "",
    startDate: "",
    endDate: "",
    available: "",
    tickets: [],
    itenerary: [],
  });
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    place: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    loadSellerExperience();
    return () => {
      source.cancel();
    };
  }, []);

  const loadSellerExperience = async () => {
    let res = await getSingleExperience(match.params.expId, source.token);
    dispatch(fetchSingleExperience(res.data));
    const formattedStartDate = moment(res.data.startDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(res.data.endDate).format("YYYY-MM-DD");
    setData({
      ...data,
      ...res.data,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    setAddress(res.data.location);
    setPreview(`${process.env.REACT_APP_API}/experience/image/${res.data._id}`);
  };

  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setImage(evt.target.files[0]);
  };

  //select place
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setLocation({ lat: coordinates.lat, lng: coordinates.lng, place: value });
  };

  const makeRequest = async (formData) => {
    const mergeData = { ...formData, location:address, lat:coordinates.lat, lng:coordinates.lng };
    const refreshToast = toast.loading("Adding...");
    try {
      let res = await updateExperience(token, mergeData, match.params.expId);

      toast.success(`${res.data.title} is updated`, {
        id: refreshToast,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      // setError(error.response.data.error);
      toast.error("Error updating", {
        id: refreshToast,
      });
    }
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      setCurrentStep((prev) => prev + 1);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <ExperienceData
      next={handleNextStep}
      data={data}
      
      address={address}
      setAddress={setAddress}
      handleSelect={handleSelect}
      handleImageChange={handleImageChange}
    />,
    <TicketData next={handleNextStep} prev={handlePrevStep} data={data} setData={setData} />,
  ];
  return (
    <div className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <main className="w-full mx-auto ">{steps[currentStep]}</main>
    </div>
  );
};

export default EditExperience;
