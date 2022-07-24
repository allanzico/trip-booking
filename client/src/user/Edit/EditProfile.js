import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ProfileEditForm from "./ProfileEditForm";
import { editProfile } from "../../actions/auth";
import axios from "axios";
import { parsePhoneNumber } from "react-phone-number-input";

const EditProfile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token, user } = auth;
  const source = axios.CancelToken.source();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
 
  useEffect(() => {
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhoneNumber(user.phone?.number);
    return () => {
      source.cancel();
    };
  }, [user.email, user.firstName, user.lastName, user.phone.number, source]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const refreshToast = toast.loading("Adding...");
    try {
      const userId = user._id;
      let phone;
      if(phoneNumber != null) {
       phone = parsePhoneNumber(phoneNumber);
      }else {
        phone = {}
      }
      
      const data = {
        userId,
        lastName,
        firstName,
        email,
        phone,
      };
      const res = await editProfile(data, token, source.token);
      toast.success('Profile has been updated', {
        id: refreshToast,
      });
      setUpdateSuccess(res.data.message);

    } catch (error) {
      console.log(error);
      // setError(error.response.data.error);
      toast.error("Error updating", {
        id: refreshToast,
      });
      setTimeout(() => {
        setUpdateError("");
      }, 5000);
    }
  };

  
  //Two factor authentication

  return (
    <>
      <main className="max-w-full mx-auto shadow-xs bg-white rounded-md">
        <div className="grid grid-cols-1">
          <h2 className="text-xl font-bold">Update Profile</h2>
        </div>
        <div className="grid grid-cols-1">
          <ProfileEditForm
            handleSubmit={handleSubmit}
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            email={email}
            phoneNumber={phoneNumber}
            error={updateError}
            success={updateSuccess}
            setPhoneNumber={setPhoneNumber}
          />
        </div>
      </main>
    </>
  );
};

export default EditProfile;
