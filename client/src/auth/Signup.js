import React, { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import { toast } from "react-toastify";
import { register } from "../actions/auth";
import SignupSVG from "../images/SignupSVG";
import PageTitle from "../components/Typography/PageTitle";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }
    try {
      await register({
        email,
        name,
        password,
        role: "buyer"
      });
      toast.success("Signup successful");
      history.push("/login");
    } catch (error) {
      setError(error.response.data.error);
      setShowAlert(true)
    }
  };

  return (
    <>
      <div className="container mt-5 flex flex-col text-center">
        <PageTitle>create an account</PageTitle>
      </div>
      <section class="relative ">
        <div class="container pl-5 pt-2 overflow-hidden shadow-sm mt-5 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="flex flex-1 flex-col items-center lg:items-start">
            <div class="flex justify-center items-center flex-wrap gap-6">
              <SignupSVG />
              <SignUpForm
                handleSubmit={handleSubmit}
                name={name}
                email={email}
                password={password}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                error={error}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
