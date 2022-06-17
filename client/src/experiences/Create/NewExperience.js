import React, { useState } from "react";
import PageTitle from "../../components/Typography/PageTitle";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { createExperience } from "../../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import ExperienceForm from "../../components/forms/ExperienceForm";
import toast from "react-hot-toast";
import Stepper from "../Stepper";
import StepperControl from "../StepperControl";
import ExperienceData from "./steps/ExperienceData";
import TicketData from "./steps/TicketData";
import Complete from "./steps/Complete";
import {StepperContext} from "../../contexts/StepperContext";

const NewExperiences = () => {
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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    startDate: "",
    endDate: "",
    location:"",
    available: "",
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
  const { title, description, image, price, startDate, endDate, available } =
    values;
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );

  const dispatch = useDispatch();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const refreshToast = toast.loading("Adding...");

    try {
      let experienceData = new FormData();
      experienceData.append("title", title);
      experienceData.append("description", description);
      image && experienceData.append("image", image);
      experienceData.append("price", price);
      experienceData.append("startDate", startDate);
      experienceData.append("endDate", endDate);
      experienceData.append("available", available);
      experienceData.append("location", address);
      experienceData.append("lat", coordinates.lat);
      experienceData.append("lng", coordinates.lng);
      const res = await createExperience(token, experienceData);
      // dispatch(createExperience(res.data))
      toast.success("Added new experience", {
        id: refreshToast,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error adding", {
        id: refreshToast,
      });
    }
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

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const steps = ["Experience Data", "Ticket Data",  "Complete",];

  const displaySteps = (step) => {
    switch (step) {
      case 1:
        return <ExperienceData formData={formData} setFormData={setFormData} />;
      case 2:
        return <TicketData />;
      case 3:
        return <Complete />;
      default:
        break;
    }
  };

  const handleStepControl = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <>
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className='my-10 p-10'>
        <StepperContext.Provider
          value={{ userData, setUserData, finalData, setFinalData }}
        >
          {displaySteps(currentStep)}
        </StepperContext.Provider>
      </div>
      </div>

      {currentStep !== steps.length && (
              <StepperControl
              steps={steps}
              currentStep={currentStep}
              handleStepControl={handleStepControl}
            />
      )}
    </>
  );
};

export default NewExperiences;
