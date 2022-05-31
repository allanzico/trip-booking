import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Wrapper } from "@googlemaps/react-wrapper";
import PlacesAutocomplete from "react-places-autocomplete";
import { getLatLng, geocodeByAddress } from "react-places-autocomplete";
import { useHistory } from "react-router-dom";
import GooglePlacesSearch from "../GooglePlacesSearch";
import moment from "moment";
const SearchForm = () => {
  const history = useHistory();
  const { RangePicker } = DatePicker;
  const { option } = Select;
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    place: "",
  });

  //select place
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setLocation({ lat: coordinates.lat, lng: coordinates.lng, place: value });
  };

  const handleSubmit = () => {
    history.push(`/search-result?location=${address}&date=${date}`);
  };

  return (
   
<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-1">
      <div class="w-full flex flex-col md:col-span-3 lg:col-span-3">
        <GooglePlacesSearch
          address={address}
          setAddress={setAddress}
          handleSelect={handleSelect}
        />
      </div>
      <div class="w-full flex flex-col md:col-span-2 lg:col-span-2 ">
        <RangePicker
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
          className=" w-full
          rounded-sm
          py-2
          pl-10
          px-[14px]
          border border-gray
          outline-none
          hover:outline-orange-500
          hover:outline-1
          focus-visible:shadow-none
          focus:border-primary"
        />
      </div>
      <div class="w-full flex flex-col md:col-span-1 lg:col-span-1">
        <button
          onClick={handleSubmit}
          type="submit"
          className="
                cursor-pointer
                w-full
                text-white
                bg-orange-500
                rounded-sm
                px-2
                py-2
                transition
                hover:bg-orange-700
                uppercase
                "
        >
          Search
        </button>
      </div>
    </div>
  
    
  );
};

export default SearchForm;
