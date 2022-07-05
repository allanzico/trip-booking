import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/CustomMUI/CustomTextField";
import LoginSVG from "../../images/LoginSvg";
import * as Yup from "yup";
import SignupSVG from "../../images/SignupSVG";
const LoginDetails = (props) => {
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Please enter a password"),
  });

  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <>
      <div className="container mb-5 flex flex-col text-center">
        <h1 className="lg:text-4xl text-2xl"> Personal Information</h1>
      </div>
      <section class="relative ">
        <div class="container pl-5 pt-2 overflow-hidden mt-5 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="flex flex-1 flex-col items-center">
            <div class="flex justify-center items-center flex-wrap gap-6">
              <LoginSVG />
              <div className="grid grid-cols-1">
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form autoComplete="off">
              <div className="flex flex-col  ">
                <div className="grid grid-cols-1 gap-2">
               
                <div className="col-span-6">
                <div className="grid grid-cols-6 gap-2">
            
                <div className="col-span-6 sm:col-span-6 md:col-span-3">
                    
                <CustomTextField
                      name="lastName"
                      type="text"
                      label="Last Name"
                      size="small"
                    />
                     </div>

                </div>
                </div>
                  <div className="col-span-6">
                    <CustomTextField name="email" label="email" size="small" />
                  </div>
            
                  <div className="col-span-6">
                    <CustomTextField
                      name="password"
                      type="password"
                      label="password"
                      size="small"
                    />
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
                        Login
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mb-2 my-2">
            
                Don't have an account yet? <Link to="/register" className="text-orange-500">Signup here</Link>
            
            
          </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default LoginDetails;
