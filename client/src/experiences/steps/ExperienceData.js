import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../components/CustomMUI/CustomTextField";
import CustomDatePicker from "../../components/CustomMUI/CustomDatePicker";
import GooglePlacesSearch from "../../components/GooglePlacesSearch";
import MultipleFIleUploadField from "../upload/MultipleFIleUploadField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import FilePreview from "../upload/FilePreview";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

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
    startDate: Yup.date("Start Date is Required")
      .typeError("Start date is required")
      .required("Start Date is required"),

    endDate: Yup.date("")
      .typeError("End date is required")
      .when(
        "startDate",
        (start, Yup) =>
          start && Yup.min(start, "End date cannot be before start date")
      )
      .required("End Date is required"),
    description: Yup.string().required("description is required"),
    // available: Yup.number("ticket availability must be a number").required(
    //   "ticket availability is required"
    // ),
    // price: Yup.number("price must be a number").required("price is required"),
    files: Yup.array(
      Yup.object({
        url: Yup.string().required(),
      })
    ).min(1, "Please upload at least one image"),
   extraPerks: Yup.array(
      Yup.object({
        perkName: Yup.string(),
      }) ).max(10, "You can only add 10 perks")
  });

  return (
    <div className="grid grid-cols-1">
      <Formik
        validationSchema={experienceValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
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
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Add some extra perks: e.g Free wifi, free packing, free
                      drinks
                    </p>
                    <FieldArray name="extraPerks">
                      {({ push, remove }) => (
                        <>
                          {values.extraPerks && values.extraPerks.map((_, index) => (
                            <div className="flex flex-row gap-2">
                            
                              <input
                                type="text"
                                name={`extraPerks[${index}].perkName`}
                                onChange={(value) =>
                                  setFieldValue(`extraPerks[${index}].perkName`, value.target.value, true)
                                }
                                value={values.extraPerks[index].perkName}
                                className="
                                  w-full
                                  rounded-sm
                                  py-2
                                  px-[14px]
                                  bg-gray-100
                                  outline-none
                                  focus-visible:shadow-none
                                  focus:border-primary
                                  "
                                placeholder="e.g Free wifi, free packing, free drinks"
                              />
                              <button disabled={isSubmitting} onClick={() => remove(index)} className="p-2 text-lxs text-gray-900 hover:bg-gray-100 hover:scale-100 transition transform duration-200 ease-out">
                                <XIcon className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                                  <div className="grid grid-cols-1">
                  <div class="mb2 py-3 text-left">
                    <div className="cursor-pointer">
                    <p disabled={isSubmitting} onClick={() => push({perkName:''})} className="px-4 py-2 w-28 text-lxs text-gray-600 uppercase text-xs font-semibold bg-gray-200">
                      Add perk
                    </p>
                    </div>
                  </div>
                </div>
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <div className="col-span-6 mb-2">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500">
                      Add Images to this experience
                    </p>
                    {values.files && values.files.length > 0 && (
                      <>{JSON.stringify(values.files)}</>
                    )}
                    <MultipleFIleUploadField name="files" />
                  </div>
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
