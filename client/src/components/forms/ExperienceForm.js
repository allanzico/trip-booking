import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import GooglePlacesSearch from "../GooglePlacesSearch";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomTextField from "../CustomMUI/CustomTextField";
import CustomDatePicker from "../CustomMUI/CustomDatePicker";
const ExperienceForm = (props) => {
  const {address, handleSelect, setAddress} = props
  const handleSubmit = (data) => {
    props.submit(data);
  };
  const customStyle = {
    styles:
      "w-full rounded-sm py-2 pl-10 px-[14px] border border-gray outline-none",
  };
  const experienceValidationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    startDate: Yup.date().required("start is required"),
    endDate: Yup.date().required("end date is required"),
    description: Yup.string().required("description is required"),
    available: Yup.number("ticket availability must be a number").required(
      "ticket availability is required"
    ),
    price: Yup.number("price must be a number").required("price is required"),
  });

  console.log(props)
  return (
    <div className="grid grid-cols-1">
      <Formik
        validationSchema={experienceValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form autoComplete="off">
            <div className="flex flex-col mb-4 ">
              <div className="grid grid-cols-1 space-y-2">
                <div className="col-span-6">
                  <CustomTextField name="title" label="title" size="small" />
                </div>

                <div className="col-span-6">
                  <CustomTextField
                    name="description"
                    label="description"
                    size="small"
                    multiline={true}
                    rows={4}
                  />
                </div>
                <div className="col-span-6 mb-2">
                  <GooglePlacesSearch
                    address={address}
                    setAddress={setAddress}
                    handleSelect={handleSelect}
                    customStyle={customStyle}
                  />
                </div>
                <div className="col-span-6">
                  <div className="flex flex-col md:flex-row gap-2">
                    <CustomDatePicker
                      name="startDate"
                      label="start date"
                      size="small"
                    />
                    <CustomDatePicker
                      name="endDate"
                      label="start date"
                      size="small"
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="flex flex-col md:flex-row gap-2">
                    <CustomTextField
                      type="number"
                      name="available"
                      label="available"
                      size="small"
                    />
                    <CustomTextField
                      type="number"
                      name="price"
                      label="price"
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ExperienceForm;
