import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageTitle from "../components/Typography/PageTitle";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import {
  createExperience,
  getSingleExperience,
  updateExperience,
} from "../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import ProfileEditForm from "../components/forms/ProfileEditForm";
import { editProfile } from "../actions/auth";
import axios from "axios";
import { updateUser, userUpdateLoading } from "../Redux/reducers/auth";
import TwoFactorModal from "../components/modals/TwoFactorModal";

const EditProfile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token, user } = auth;
  const source = axios.CancelToken.source();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    return () => {
      source.cancel();
    };
  }, []);

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
        name,
        email,
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
  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setImage(evt.target.files[0]);
  };

  //Two factor authentication

  return (
    <>
      <main className="max-w-7xl mx-auto ">
        <section>
          <h2 className="text-4xl font-semibold text-gray-700">Edit Profile</h2>
          <div className="grid grid-cols-1">
            <ProfileEditForm
              handleSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              error={updateError}
              success={updateSuccess}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setName={setName}
            />
          </div>
        </section>
        <section>

          <div className="cursor-pointer">
            <button
              type="submit"
              className="
                text-white
                bg-orange-500
                rounded-sm
                px-5
                py-2
                transition
                hover:bg-orange-700
                uppercase
                "
                onClick={() => setShowModal(!showModal)}
            >
              ENABLE 2FA
            </button>
          </div>
          {showModal && (
            <TwoFactorModal
              auth={auth}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </section>
      </main>
    </>
  );
};

export default EditProfile;
