import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../actions/auth";
import { updateUser } from "../../Redux/reducers/auth";
import PasswordEditForm from "./PasswordEditForm";
import axios from "axios";

const EditPassword = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token, user } = auth;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setUpdateError("");
      }, 5000);
      return setUpdateError("Passwords don't match");
    }
    try {
      const userId = user._id;
      const data = {
        userId,
        password,
      };
      const res = await editProfile(data, token, source.token);
      dispatch(updateUser(res.data));
      setUpdateSuccess(res.data.message);
    } catch (error) {
      console.log(error);
      // setError(error.response.data.error);
      setTimeout(() => {
        setUpdateError("");
      }, 5000);
    }
  };

  return (
    <main className="max-w-full mx-auto shadow-xs bg-white rounded-md">
       <div className="grid grid-cols-1">
         <h2 className="text-xl font-bold">
           Change Password
         </h2>
       </div>
      
      <div className="grid grid-cols-1">
        <PasswordEditForm
          handleSubmit={handleSubmit}
          password={password}
          confirmPassword={confirmPassword}
          error={updateError}
          success={updateSuccess}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
        />
      </div>
    </main>
  );
};

export default EditPassword;
