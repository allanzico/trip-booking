import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, login } from "../actions/auth";
import { useDispatch } from "react-redux";
import LoginSVG from "../images/LoginSvg";
import PageTitle from "../components/Typography/PageTitle";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await forgotPassword(email);
      setSuccess(data.data);
      setEmail("");
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      <div className="container mt-5 flex flex-col text-center">
        <p>
          Please enter email address you registered your account with. We will
          send you a reset link to this email
        </p>
      </div>
      <section class="relative ">
        <div class="container py-5 pl-5 overflow-hidden shadow-sm mt-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="flex flex-1 flex-col items-center lg:items-start">
            <div class="flex justify-center flex-wrap gap-6">
              <LoginSVG />
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                email={email}
                error={error}
                success={success}
                setEmail={setEmail}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
