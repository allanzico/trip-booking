import React, { useState } from "react";

import { resetPassword } from "../actions/auth";

import LoginSVG from "../images/LoginSvg";
import PageTitle from "../components/Typography/PageTitle";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const { data } = await resetPassword( password, match.params.resetToken);
      setSuccess(data.data);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response.data.error);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      <div className="container mt-2 flex flex-col text-center">
        <PageTitle>Reset password</PageTitle>
      </div>
      <section class="relative ">
        <div class="container py-5 pl-5 overflow-hidden shadow-md mt-10 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="flex flex-1 flex-col items-center lg:items-start">
            <div class="flex justify-center flex-wrap gap-6">
              <LoginSVG />
              <ResetPasswordForm
                handleSubmit={handleSubmit}
                password={password}
                confirmPassword={confirmPassword}
                error={error}
                success={success}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
