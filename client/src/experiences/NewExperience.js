import React, { useState } from "react";
import PageTitle from '../components/Typography/PageTitle'
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { createExperience } from "../actions/experience";
import { useDispatch, useSelector } from "react-redux";
import ExperienceForm from "../components/forms/ExperienceForm";
import toast from 'react-hot-toast';

const NewExperiences = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    from: "",
    to: "",
    available: "",
  });
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
  const { title, description, image, price, startDate, endDate, available } =
    values;
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );

  const dispatch = useDispatch()
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const refreshToast = toast.loading('Adding...')
    
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
  experienceData.append("lat", coordinates.lat);
  experienceData.append("lng", coordinates.lng);
  const res = await createExperience(token, experienceData);
  // dispatch(createExperience(res.data))
  toast.success('Added new experience', {
    id: refreshToast,
  })
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} catch (error) {
  console.log(error)
  toast.error('Error adding', {
    id: refreshToast,
  })
}
  };

  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setValues({ ...values, image: evt.target.files[0] });
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
     setLocation({lat: coordinates.lat, lng: coordinates.lng, place:value})
  };

  return (
    <>
      <div className="container flex-1 text-center">
        <PageTitle>
        Add experience
        </PageTitle>
      </div>
      <div className="container pl-5 overflow-hidden flex flex-col-reverse lg:flex-row items-center gap-12">
      <div class="flex flex-1 flex-col items-center lg:items-start">
          <div class="flex justify-center flex-wrap gap-6">
            <ExperienceForm
              values={values}
              setValues={setValues}
              setAddress={setAddress}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSelect={handleSelect}
              handleSubmit={handleSubmit}
              address={address}
              location={address}
              setLocation={setLocation}
            />
            
          </div>
          <div className="grid grid-cols-3 ">
            <img src={preview} alt="preview" className="img img-fluid m-2" />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(coordinates)}
        </div>

        </div>
      </div>
    </>
  );
};

export default NewExperiences;
