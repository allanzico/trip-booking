import React, { useState } from "react";
import PersonalInfo from "./steps/PersonalInfo";
import UserInterests from "./steps/UserInterests";

import { register } from "../../actions/auth";
import { parsePhoneNumber } from "react-phone-number-input";

const Register = ({ history }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userInterests: [],
    role: "buyer",
    phone: ""
  });
  const { password, confirmPassword } = data;
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");

  const makeRequest = async (formData) => {
     
    if (password !== confirmPassword) {
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords don't match");
      }
      if(data.phone) {
        formData.phone = parsePhoneNumber(data.phone);
      }else {
        formData.phone = {}
      }
      try {
        await register(formData);
        history.push("/login");
      } catch (error) {
        console.log(error)
        
      }
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
    <PersonalInfo next={handleNextStep} data={data} error={error} />,
    <UserInterests next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return (
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      {steps[currentStep]}
    </main>
  );
};

export default Register;
