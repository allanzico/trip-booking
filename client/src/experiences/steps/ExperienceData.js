import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../components/CustomMUI/CustomTextField";
import CustomDatePicker from "../../components/CustomMUI/CustomDatePicker";
import GooglePlacesSearch from "../../components/GooglePlacesSearch";
import MultipleFIleUploadField from "../upload/MultipleFIleUploadField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";

const ExperienceData = (props) => {
  const { address, handleSelect, setAddress } = props;

  const handleSubmit = (values) => {
    console.log(values);
    props.next(values);
  };
  const customStyle = {
    styles:
      "w-full rounded-sm py-2 pl-10 px-[14px] border border-gray outline-none",
  };
  const experienceValidationSchema = Yup.object().shape({
    title: Yup.string().required("title is required"),
    startDate: Yup
    .date('Start Date is Required')
    .typeError("Start date is required") 
    .required('Start Date is required'),

  endDate: Yup
    .date('')           
    .typeError("End date is required") 
    .when("startDate",
        (start, Yup) => start && Yup.min(start, "End date cannot be before start date"))
    .required('End Date is required'),  
    description: Yup.string().required("description is required"),
    available: Yup.number("ticket availability must be a number").required(
      "ticket availability is required"
    ),
    price: Yup.number("price must be a number").required("price is required"),
    files: Yup.array(
      Yup.object({
        url: Yup.string().required(),
      })
    ),
  });

  return (
    <div className="grid grid-cols-1">
      <Formik
        validationSchema={experienceValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form autoComplete="off">
            <div className="flex flex-col mb-4 ">
              <div className="grid grid-cols-1">
                <div className="col-span-6 mb-2">ADD MAIN IMAGE</div>
              </div>
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
                <div className="col-span-6">
                  <div className="flex flex-col md:flex-row gap-2">
                    <CustomDatePicker
                      name="startDate"
                      label="start date"
                      size="small"
                      value={values.startDate}
                      onChange={(value) =>
                        setFieldValue("startDate", value, true)
                      }
                    />
                    <CustomDatePicker
                      name="endDate"
                      label="end date"
                      size="small"
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      value={values.endDate}
                      onChange={(value) =>
                        setFieldValue("endDate", value, true)
                      }
                    />
                  </div>
                </div>
                <div className="col-span-6 mb-2">
                  <p className="text-sm py-2 ">
                    Add more Images to this experience
                  </p>
                  {values.files && values.files.length > 0 && (
                    <>{JSON.stringify(values.files)}</>
                  )}
                  <MultipleFIleUploadField name="files" />
                </div>

                <div className="grid grid-cols-1 mt-3 ">
                  <div class="mb2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <div className="cursor-pointer">
                      <button
                        type="submit"
                        className="
                          text-white
                          bg-orange-500
                          rounded-sm
                          px-3
                          py-2
                          transition
                          hover:bg-orange-700
                          uppercase
                          "
                      >
                        Next
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
  );
};

export default ExperienceData;
