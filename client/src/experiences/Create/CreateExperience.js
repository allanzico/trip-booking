import React, { useState } from "react";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { addExperience} from "../../actions/experience";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ExperienceData from "../steps/ExperienceData";
import TicketData from "../steps/TicketData";
import { getDatesInRange } from "../../components/shared/Utils";


const CreateExperience = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    startDate: "",
    location: "",
    endDate: "",
    lat: "",
    lng: "",
    available: 0,
    tickets: [],
    itenerary: [],
    files: [],
    extraPerks: [],
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


  const [currentStep, setCurrentStep] = useState(0);


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
    const formatStartDate = new Date(formData.startDate.toString());
    const formatEndDate = new Date(formData.endDate.toString());
    const dates = getDatesInRange(formatStartDate, formatEndDate);
    mergeData.itenerary = dates.map((date) => {
      return {
        date: (date.date).toLocaleDateString(),
        title: "new itenerary",
        data: new Map(),
      };
    })

    mergeData.startDate = formatStartDate.toLocaleString()
    mergeData.endDate = formatEndDate.toLocaleString()
    const refreshToast = toast.loading("Adding...");
    try {
   
     await addExperience(token, mergeData);
      toast.success("Added new experience", {
        id: refreshToast,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      // setError(error.response.data.error);
            toast.error("Error adding", {
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
      location={location}
    />,
    <TicketData setData={setData} next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return (
    <div className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <main className="w-full mx-auto ">{steps[currentStep]}</main>
    </div>
  );
};

export default CreateExperience;
