import React, { useState } from 'react'
import BusinessInfo from './steps/BusinessInfo';
import MoreBusinessInfo from './steps/MoreBusinessInfo';
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";

const RegisterMerchant = () => {
    const [data, setData] = useState({
        email: "",
      });

      const [currentStep, setCurrentStep] = useState(0);
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

        //select place
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setLocation({ lat: coordinates.lat, lng: coordinates.lng, place: value });
  
  };

      const makeRequest = async (formData) => {
    const mergeData = {...formData, address, coordinates}
        console.log(mergeData)
           
        //   try {
        //     await register(formData);
        //     history.push("/login");
        //   } catch (error) {
        //     console.log(error)
        //     setError(error.response.data.error);
        //   }
      };
    
      const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));
        if (final) {
          makeRequest(newData);
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
        <MoreBusinessInfo next={handleNextStep} prev={handlePrevStep} data={data}           address={address}
        setAddress={setAddress}
        handleSelect={handleSelect} />
      ];

  return (
    <div className="flex flex-col container mx-auto mt-10">

        <main className="w-full mx-auto ">
        {steps[currentStep]}
        </main>
        
    </div>
  )
}

export default RegisterMerchant