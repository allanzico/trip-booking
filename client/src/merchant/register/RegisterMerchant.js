import React, { useEffect, useState } from "react";
import BusinessInfo from "./steps/BusinessInfo";
import MoreBusinessInfo from "./steps/MoreBusinessInfo";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { isAlreadyRegistered, registerCompany } from "../../actions/company";
import { useSelector } from "react-redux";
import Complete from "./steps/Complete";
import axios from "axios";
import AlreadyRegistered from "../AlreadyRegistered";

const RegisterMerchant = ({ history }) => {
  const source = axios.CancelToken.source();
  const { auth } = useSelector((state) => ({ ...state }));
  const { token} = auth;
  const [data, setData] = useState({
    email: "",
    termsOfService: false
  });
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    place: "",
  });

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyRegistered(token, source.token).then((res) => {
        if (res.data.ok) setAlreadyRegistered(true);
      });
    }
    return () => {
      source.cancel();
    };
  }, []);

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
    try {
      await registerCompany(mergeData, token);
      // history.push("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
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
    <BusinessInfo next={handleNextStep} data={data} />,
    <MoreBusinessInfo
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      address={address}
      setAddress={setAddress}
      handleSelect={handleSelect}
      error={error}
      location={location}
    />,
    <Complete />,
  ];

  return (
    <div className="flex flex-col container mx-auto mt-10">
      <main className="w-full mx-auto ">
        {alreadyRegistered ? (<AlreadyRegistered />) : (steps[currentStep])}
      </main>
    </div>
  );
};

export default RegisterMerchant;
