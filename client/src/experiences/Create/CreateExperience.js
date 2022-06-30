import React, { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { createExperience } from "../../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CreateTicketModal from "./CreateTicketModal";
import CreateTicketForm from "./CreateTicketForm";
import ExperienceData from "./steps/ExperienceData";
import TicketData from "./steps/TicketData";

const CreateExperience = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    from: "",
    to: "",
    available: "",
  });

  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    startDate: "",
    endDate: "",
    available: "",
    test: "",
  });
  const [address, setAddress] = useState("");
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

  const [ticketArray, setTicketArray] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useDispatch();
  const handleSubmit = async (evt, newData) => {
    evt.preventDefault();
    // const mergeData = { ...formData, address, coordinates };
    setData((prev) => ({ ...prev, ...newData }));
    console.log(data);
    // const refreshToast = toast.loading("Adding...");
    // try {
    //   // let experienceData = new FormData();
    //   // experienceData.append("title", title);
    //   // experienceData.append("description", description);
    //   // image && experienceData.append("image", image);
    //   // experienceData.append("price", price);
    //   // experienceData.append("startDate", startDate);
    //   // experienceData.append("endDate", endDate);
    //   // experienceData.append("available", available);
    //   // experienceData.append("location", address);
    //   // experienceData.append("lat", coordinates.lat);
    //   // experienceData.append("lng", coordinates.lng);
    //   // experienceData.append(`tickets`, JSON.stringify(ticketArray))
    //   const res = await createExperience(token, data);
    //   // dispatch(createExperience(res.data))
    //   toast.success("Added new experience", {
    //     id: refreshToast,
    //   });
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 500);
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Error adding", {
    //     id: refreshToast,
    //   });
    // }
  };

  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setValues({ ...values, image: evt.target.files[0] });
  };

  const handleChange = (evt) => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value,
    });
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
    const mergeData = { ...formData, address, coordinates };
    console.log(mergeData);
    // try {
    //   const res = await createExperience(token, mergeData);
    //   dispatch(createExperience(res.data))
    //   toast.success("Added new experience", {
    //     id: refreshToast,
    //   });
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 500);
    // } catch (error) {
    //   console.log(error);
    //   setError(error.response.data.error);
    // }
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
    />,
    <TicketData
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      ticketArray={ticketArray}
      setTicketArray={setTicketArray}
    />,
  ];

  return (
    <div className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <main className="w-full mx-auto ">{steps[currentStep]}</main>
    </div>
  );
};

export default CreateExperience;
