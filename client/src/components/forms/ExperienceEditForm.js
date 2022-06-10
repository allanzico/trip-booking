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

    // <>
    //   <form onSubmit={handleSubmit}>
    //     <div class="shadow-sm overflow-hidden">
    //       <div class="px-4 py-5 bg-white sm:p-6">
    //         <div class="grid grid-cols-6 gap-6">
    //           <div class="col-span-6">
    //             {/* title input  */}
    //             <div class="mb-2">
    //               <input
    //                 type="text"
    //                 placeholder="title"
    //                 name="title"
    //                 onChange={handleChange}
    //                 value={title}
    //                 className="
    //                 w-full
    //                 rounded-sm
    //                 py-2
    //                 px-[14px]
    //                 border border-gray
    //                 outline-none
    //                 hover:outline-orange-500
    //                 hover:outline-1
    //                 focus-visible:shadow-none
    //                 focus:border-primary
    //                 "
    //               />
    //             </div>
    //           </div>

    //           <div class="col-span-6">
    //             {/* description input  */}
    //             <div class="mb-2">
    //               <textarea
    //                 type="text"
    //                 name="description"
    //                 placeholder="description"
    //                 onChange={handleChange}
    //                 value={description}
    //                 className="
    //                 w-full
    //                 rounded-sm
    //                 py-4
    //                 px-[14px]
    //                 border border-gray
    //                 outline-none
    //                 hover:outline-orange-500
    //                 hover:outline-1
    //                 focus-visible:shadow-none
    //                 focus:border-primary
    //                 "
    //               />
    //             </div>
    //           </div>
    //           <GooglePlacesSearch
    //             address={address}
    //             setAddress={setAddress}
    //             handleSelect={handleSelect}
    //           />

    //           <div class="col-span-6 sm:col-span-6 lg:col-span-3">
    //             <input
    //               type="number"
    //               placeholder="price"
    //               name="price"
    //               onChange={handleChange}
    //               value={price}
    //               className="
    //               w-full
    //               rounded-sm
    //               py-2
    //               px-[14px]
    //               border border-gray
    //               outline-none
    //               hover:outline-orange-500
    //               hover:outline-1
    //               focus-visible:shadow-none
    //               focus:border-primary
    //               "
    //             />
    //           </div>
    //           <div class="col-span-6 sm:col-span-6 lg:col-span-3">
    //             <input
    //               type="number"
    //               placeholder="available tickets"
    //               name="available"
    //               onChange={handleChange}
    //               value={available}
    //               className="
    //               w-full
    //               rounded-sm
    //               py-2
    //               px-[14px]
    //               border border-gray
    //               outline-none
    //               hover:outline-orange-500
    //               hover:outline-1
    //               focus-visible:shadow-none
    //               focus:border-primary
    //               "
    //             />
    //           </div>

    //           <div class="col-span-6 sm:col-span-6 lg:col-span-3">
    //             <DatePicker
    //               defaultValue={moment(startDate)}
    //               placeholder="From date"
    //               className="w-full
    //               rounded-sm
    //               py-2
    //               px-[14px]
    //               border border-gray
    //               outline-none
    //               hover:outline-orange-500
    //               hover:outline-1
    //               focus-visible:shadow-none
    //               focus:border-primary "
    //               onChange={(dateString) =>
    //                 setValues({ ...values, startDate: dateString })
    //               }
    //               disabledDate={(current) =>
    //                 current && current.valueOf() < moment().subtract(1, "days")
    //               }
    //             />
    //           </div>
    //           <div class="col-span-6 sm:col-span-6 lg:col-span-3">
    //             <DatePicker
    //             defaultValue={moment(endDate)}
    //               placeholder="To date"
    //               className="w-full
    //               rounded-sm
    //               py-2
    //               px-[14px]
    //               border border-gray
    //               outline-none
    //               hover:outline-orange-500
    //               hover:outline-1
    //               focus-visible:shadow-none
    //               focus:border-primary "
    //               onChange={(dateString) =>
    //                 setValues({ ...values, endDate: dateString })
    //               }
    //               disabledDate={(current) =>
    //                 current && current.valueOf() < moment().subtract(1, "days")
    //               }
    //             />
    //           </div>
    //         </div>
    //         <div class="grid grid-cols-3 gap-1">
    //           <div class="mb-3 w-full">
    //             <label
    //               for="formFile"
    //               className="form-label inline-block mb-2 mt-2 text-gray-700"
    //             >
    //               Upload images
    //             </label>
    //             <input
    //               className="form-control
    //                 block
    //                 w-full
    //                 rounded-sm
    //                 py-2
    //                 px-[14px]
    //                 border border-gray
    //                 outline-none
    //                 hover:outline-orange-500
    //                 hover:outline-1
    //                 focus-visible:shadow-none
    //                 focus:border-primary
    //                 transition
    //                 ease-in-out
    //                 m-0"
    //               type="file"
    //               name="image"
    //               accept="image/*"
    //               onChange={handleImageChange}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
    //         <div className="cursor-pointer">
    //           <button
    //             type="submit"
    //             className="
    //             text-white
    //             bg-orange-500
    //             rounded-sm
    //             px-5
    //             py-2
    //             transition
    //             hover:bg-orange-700
    //             uppercase
    //             "
    //           >
    //             Update
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </>
  );
};

export default ExperienceEditForm;
