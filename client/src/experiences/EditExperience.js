import React, { useEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import {
  getSingleExperience,
  updateExperience,
} from "../actions/experience";
import { useSelector } from "react-redux";
import ExperienceEditForm from "../components/forms/ExperienceEditForm";
import axios from "axios";
import toast from "react-hot-toast";

const EditExperience = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const source = axios.CancelToken.source();
  const [values, setValues] = useState({
    title: "",
    description: "",

    price: "",
    from: "",
    to: "",
    available: "",
    location: " ",
  });
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    place: "",
  });
  const { title, description, price, startDate, endDate, available } = values;
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );

  useEffect(() => {
    loadSellerExperience();
    return () => {
      source.cancel();
    };
  }, []);

  const loadSellerExperience = async () => {
    let res = await getSingleExperience(match.params.expId, source.token);
    setValues({ ...values, ...res.data });
    setAddress(res.data.location);
    setPreview(`${process.env.REACT_APP_API}/experience/image/${res.data._id}`);
  };

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
      let res = await updateExperience(
        token,
        experienceData,
        match.params.expId
      );

      toast.success(`${res.data.title} is updated`, {
        id: refreshToast,
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data)
      toast.error("Error updating", {
        id: refreshToast,
      });
    }
  };

  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setImage(evt.target.files[0]);
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

  return (
    <>
      <div className="container flex-1 text-center">
        <PageTitle>Edit experience</PageTitle>
      </div>
      <div className="container overflow-hidden flex flex-col-reverse lg:flex-row items-center gap-6">
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <div class="flex justify-center flex-wrap gap-6">
            <ExperienceEditForm
              values={values}
              setValues={setValues}
              setAddress={setAddress}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSelect={handleSelect}
              handleSubmit={handleSubmit}
              address={address}
              setLocation={setLocation}
            />
          </div>
          <div className="grid grid-cols-3 ">
            <img src={preview} alt="preview" className="img img-fluid m-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditExperience;
