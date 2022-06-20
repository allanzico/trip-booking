import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import GooglePlacesSearch from "../../../components/GooglePlacesSearch";

const MoreBusinessInfo = (props) => {
const {address, setAddress, handleSelect} = props
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <>
      <div className="container mb-2 flex flex-col text-center">
        <h1 className="lg:text-4xl text-2xl"> More Data</h1>
      </div>

              
              <div className="grid grid-cols-1">
        <Formik
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
        
          {({ values }) => (
            <Form>
              <div className="flex flex-col">
              <div className="grid grid-cols-1 space-y-2"> 
              <div className="col-span-6 mb-2">
                <p>Lorem</p>
              </div>
                    {/* Location input */}
      <div className="col-span-6 mb-2">
        <GooglePlacesSearch
          address={address}
          setAddress={setAddress}
          handleSelect={handleSelect}
        />
      </div>
              </div>

                
                <div className="grid grid-cols-1 mt-3 ">
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <div className="flex items-center justify-end gap-2">
                      <div className="cursor-pointer">
                        <button
                          onClick={() => props.prev(values)}
                          type="submit"
                          className="
                          text-white
                          bg-gray-400
                          rounded-sm
                          px-5
                          py-2
                          transition
                          hover:bg-gray-600
                          uppercase
                "
                        >
                          Back
                        </button>
                      </div>
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
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    

    </>
  );
};

export default MoreBusinessInfo;
