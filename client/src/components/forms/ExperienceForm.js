import React from "react";
import { DatePicker} from "antd";
import moment from "moment";

import GooglePlacesSearch from "../GooglePlacesSearch";
const ExperienceForm = (props) => {
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

    
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="shadow-sm overflow-hidden">
          <div class="px-4 py-5 bg-white sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <h2>Main event image</h2>
              <p>This is the first image attendees will see at the top of your listing. Use a high quality image: 2160x1080px (2:1 ratio)</p>
              <div class="col-span-6">
                {/* title input  */}
                <div class="mb-2">
                  <input
                    type="text"
                    placeholder="title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                    className="
                    w-full
                    rounded-sm
                    py-2
                    px-[14px]
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                  />
                </div>
              </div>

              <div class="col-span-6">
                {/* description input  */}
                <div class="mb-2">
                  <textarea
                    type="text"
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                    value={description}
                    className="
                    w-full
                    rounded-sm
                    py-4
                    px-[14px]
                    border border-gray
                    outline-none
                    hover:outline-orange-500
                    hover:outline-1
                    focus-visible:shadow-none
                    focus:border-primary
                    "
                  />
                </div>
              </div>
              <GooglePlacesSearch
                address={address}
                setAddress={setAddress}
                handleSelect={handleSelect}
              />
              <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                <input
                  type="number"
                  placeholder="price"
                  name="price"
                  onChange={handleChange}
                  value={price}
                  className="
                  w-full
                  rounded-sm
                  py-2
                  px-[14px]
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary
                  "
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                <input
                  type="number"
                  placeholder="available tickets"
                  name="available"
                  onChange={handleChange}
                  value={available}
                  className="
                  w-full
                  rounded-sm
                  py-2
                  px-[14px]
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary
                  "
                />
              </div>

              <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                <DatePicker
                  placeholder="From date"
                  className="w-full
                  rounded-sm
                  py-2
                  px-[14px]
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
              <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                <DatePicker
                  placeholder="To date"
                  className="w-full
                  rounded-sm
                  py-2
                  px-[14px]
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
            <div class="grid grid-cols-3 gap-1">
              <div class="mb-3 w-full">
                <label
                  for="formFile"
                  className="form-label inline-block mb-2 mt-2 text-gray-700"
                >
                  Upload images
                </label>
                <input
                  className="form-control
                    block
                    w-full
                    rounded-sm
                    py-2
                    px-[14px]
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
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExperienceForm;
