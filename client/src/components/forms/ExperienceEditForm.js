import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import GooglePlacesSearch from "../GooglePlacesSearch";

const ExperienceEditForm = (props) => {
  const {
    values,
    setValues,
    address,
    setAddress,
    handleChange,
    handleImageChange,
    handleSelect,
    handleSubmit,
  } = props;
  const { title, description, image, price, startDate, endDate, available } =
    values;
    const customStyle = {
      styles:
        "w-full rounded-sm py-2 pl-10 px-[14px] border border-gray outline-none",
    };
  return (
    <div className="flex flex-col">
      {/* Image Preview */}
      <div className="col-span-6">
        <h2>Main event image</h2>
        <p>
          This is the first image attendees will see at the top of your listing.
          Use a high quality image: 2160x1080px (2:1 ratio)
        </p>
      </div>

      {/* Title input */}
      <div className="col-span-6">
        <div className="relative mb-4 ">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={title}
            className="
                    peer
                    placeholder-transparent
                    w-full
                    rounded-sm
                    py-2
                    px-2
                    border border-gray
                    outline-none
                    focus:outline-orange-500
                    focus:outline-1
                    "
          />
          <label
            for="title"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Title
          </label>
        </div>
      </div>

      {/* Description input */}
      <div className="col-span-6">
        <div class="relative mb-2">
          <textarea
            type="text"
            name="description"
            placeholder="description"
            onChange={handleChange}
            value={description}
            className="
                    peer
                    placeholder-transparent
                    w-full
                    rounded-sm
                    py-4
                    px-2
                    border border-gray
                    outline-none
                    focus:outline-orange-500
                    focus:outline-1
                    "
          />
          <label
            for="description"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Description
          </label>
        </div>
      </div>

      {/* Location input */}
      <div className="col-span-6 mb-2">
        <GooglePlacesSearch
          address={address}
          setAddress={setAddress}
          handleSelect={handleSelect}
          customStyle={customStyle}
        />
      </div>

      {/* Numbers input */}
      <div className="grid grid-cols-6 md:space-x-4">
        <div className="relative mb-4 col-span-6 sm:col-span-6 md:col-span-3">
          <input
            type="number"
            placeholder="price"
            name="price"
            onChange={handleChange}
            value={price}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  focus:outline-orange-500
                  focus:outline-1
                  "
          />
          <label
            for="price"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Price
          </label>
        </div>
        <div className="relative mb-4 col-span-6 sm:col-span-6 md:col-span-3">
          <input
            type="number"
            placeholder="available tickets"
            name="available"
            onChange={handleChange}
            value={available}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary
                  "
          />
          <label
            for="available"
            className="absolute bg-white left-2 px-2 -top-2.5 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Available tickets
          </label>
        </div>
      </div>

      {/* Dates input */}
      <div className="grid grid-cols-6 md:space-x-4">
        <div class="col-span-6 mb-4 sm:col-span-6 md:col-span-3">
          <DatePicker
           defaultValue={moment(startDate)}
            placeholder="Starts"
            name="start"
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary "
            onChange={(dateString) =>
              setValues({ ...values, startDate: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
        </div>

        <div class="col-span-6 mb-4 sm:col-span-6 md:col-span-3">
          <DatePicker
          defaultValue={moment(endDate)}
            placeholder="Ends"
            name="end"
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary "
            onChange={(dateString) =>
              setValues({ ...values, endDate: dateString })
            }
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
          />
        </div>
      </div>

      {/* Image upload */}
      <div className="grid grid-cols-6">
        <div className="col-span-6 mb-4 md:col-span-3">
          <div class="mb-3 w-full">
            <input
              className="form-control
                    block
                    w-full
                    rounded-sm
                    py-2
                    px-2
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    transition
                    ease-in-out
                    m-0"
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

export default ExperienceEditForm;
