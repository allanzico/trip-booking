import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getUserInterests } from "../../../actions/auth";
import SignupSVG from "../../../images/SignupSVG";
import InterestsSVG from "../../../images/InterestsSVG";

const UserInterests = (props) => {
  const source = axios.CancelToken.source();
  const [userInterests, setUserInterests] = useState([]);

  const loadUserInterests = async () => {
    try {
      let res = await getUserInterests(source.token);
      setUserInterests(res.data);
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  useEffect(() => {
    loadUserInterests();
    return () => {
      source.cancel();
    };
  }, []);

  const stepTwoValidationSchema = Yup.object().shape({
    userInterests: Yup.array()
      .min(1)
      .of(Yup.string().required())
      .required("Choose at least 1 option"),
  });
  const handleSubmit = (values) => {
    props.next(values, true);
  };

  return (
    <>
      <div className="container mb-2 flex flex-col text-center">
        <h1 className="lg:text-4xl text-2xl"> Interests</h1>
      </div>
      <div className="container mb-5 flex flex-col text-center">
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      </div>

      <section class="relative ">
        <div class="container pl-5 pt-2 overflow-hidden mt-5 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="flex flex-1 flex-col items-center lg:items-start">
            <div class="flex justify-center items-center flex-wrap gap-6">
              <InterestsSVG />
              
              <div className="grid grid-cols-1">
        <Formik
          validationSchema={stepTwoValidationSchema}
          initialValues={props.data}
          onSubmit={handleSubmit}
        >
        
          {({ values }) => (
            <Form>
              <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-2">
                  {userInterests &&
                    userInterests.map((interest) => (
                      <div className="flex">
                        <div class="flex border items-center p-2">
                          <Field
                            key={interest._id}
                            type="checkbox"
                            name="userInterests"
                            value={interest._id}
                          />
                          <div class="ml-2 text-sm">
                            <label class="font-medium text-gray-900 dark:text-gray-300">
                              {interest.title}
                            </label>
                            <p class="text-xs font-normal text-gray-500 dark:text-gray-300">
                              For orders shipped from $25 in books or $29 in
                              other categories
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
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
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default UserInterests;
