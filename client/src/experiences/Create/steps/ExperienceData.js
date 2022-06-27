import { DatePicker } from "antd";
import React, { useContext, useState } from "react";
import GooglePlacesSearch from "../../../components/GooglePlacesSearch";
import { StepperContext } from "../../../contexts/StepperContext";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import moment from "moment";

const ExperienceData = ({ formData, setFormData }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/300x150.png?text=PREVIEW"
  );
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
  const customStyle = {
    styles:
      "w-full rounded-sm py-2 pl-10 px-[14px] border border-gray outline-none",
  };
  //select place
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setLocation({ lat: coordinates.lat, lng: coordinates.lng, place: value });
  };

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleImageChange = (evt) => {
    setPreview(URL.createObjectURL(evt.target.files[0]));
    setFormData({ ...formData, image: evt.target.files[0] });
  };

 
  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Title
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            type="text"
            onChange={handleChange}
            value={formData.title}
            name="title"
            placeholder="Title"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Description
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <textarea
            type="text"
            onChange={handleChange}
            value={formData.description}
            name="description"
            placeholder="description"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <GooglePlacesSearch
      address={address}
      setAddress={setAddress}
      handleSelect={handleSelect}
      customStyle={customStyle}
      />
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mx-2 w-full md:w-1/2 flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Price
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              onChange={handleChange}
              value={formData.price}
              name="price"
              placeholder="price"
              type="number"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
        <div className="mx-2 w-full md:w-1/2 flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Available tickets
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              onChange={handleChange}
              value={formData.available}
              name="available"
              placeholder="Available"
              type="number"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="mx-2 w-full md:w-1/2 flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            From
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <DatePicker
              className="w-full appearance-none p-1 px-2 border-0 text-gray-800 outline-none"
              onChange={(dateString) =>
                setFormData({ ...formData, startDate: dateString })
              }
              disabledDate={(current) =>
                current && current.valueOf() < moment().subtract(1, "days")
              }
              value={formData.startDate}
            />
          </div>
        </div>
        <div className="mx-2 w-full md:w-1/2 flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            To
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <DatePicker
              className="w-full appearance-none p-1 px-2 border-0 text-gray-800 outline-none"
              onChange={(dateString) =>
                setFormData({ ...formData, endDate: dateString })
              }
              disabledDate={(current) =>
                current && current.valueOf() < moment().subtract(1, "days")
              }
              value={formData.endDate}
            />
          </div>
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Add tickets
        </div>

      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mx-2 w-full md:w-1/2 flex-1">
          <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
            Upload Images
          </div>
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <input
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceData;
