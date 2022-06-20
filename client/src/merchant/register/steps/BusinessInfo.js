import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomTextField from "../../../components/CustomMUI/CustomTextField";
const BusinessInfo = (props) => {
  const stepOneValidationSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("Email is required"),

  });

  const handleSubmit = (values) => {
    console.log("CLICKED")
    props.next(values);
  };
  return (
    <>
      <div className="container mb-5 flex flex-col text-center">
        <h1 className="lg:text-4xl text-2xl"> Business Information</h1>
      </div>

    <div className="grid grid-cols-1">
        <Formik
          validationSchema={stepOneValidationSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form autoComplete="off">
              <div className="flex flex-col  ">
                <div className="grid grid-cols-1 space-y-2">
                  <div className="col-span-6">
                    <CustomTextField name="email" label="email" size="small" />
                  </div>

                  <div className="col-span-6">
                    Location
                  </div>
                  <div className="col-span-6">
                    Business Name
                  </div>
                  <div className="col-span-6">
                    Company URL
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
                          px-5
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
            </Form>
          )}
        </Formik>
      </div>


    </>
  );
};

export default BusinessInfo;
