import { LoadingOutlined } from "@ant-design/icons";
import {
  LockClosedIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyTwofactorAuth } from "../../actions/auth";
import ErrorAlert from "../../components/shared/ErrorAlert";
import { loggedInUser } from "../../Redux/reducers/auth";

const TwoFactorAuth = ({ history }) => {
  const inputRef = useRef(null);
  const [otpInput, setOtpInput] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [finalOTP, setFinalOTP] = useState("");
  const auth = history.location.state;
  const user = auth === undefined ? null : auth?.user;
  const token = auth === undefined ? null : auth?.token;
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otpInput];
    newOTP[index] = value.substring(value.length - 1);
    setOtpInput(newOTP);
    if (!value) {
      setActiveOTPIndex(index - 1);
    } else {
      setActiveOTPIndex(index + 1);
    }
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      setActiveOTPIndex(index - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (otpInput.length > 5) {
      setFinalOTP(otpInput.join(""));
    }
  }, [activeOTPIndex, otpInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (finalOTP.length > 5) {
        setLoading(true);
        const data = { code: finalOTP };
        const res = await verifyTwofactorAuth(data, token);
        if (res.data) {
          //Update Local storage
          window.localStorage.setItem("auth", JSON.stringify(res.data));
          
          //Update redux
          dispatch(loggedInUser(res.data));
          history.push("/dashboard")
          setLoading(false);
        }
      } else {
        setError("Please enter a valid code");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setError("code expired, please click 'Resend code'");
      setShowAlert(true);
    }
  };

  return (
    <div className="h-screen py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="flex flex-col items-center w-full ">
            <div>
              <LockClosedIcon className="h-16 w-16 text-orange-500" />
            </div>
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold ">OTP Verification!</h1>
              <div className="flex flex-col mt-2">
                <span>Enter the code you received on</span>
                <span className="font-bold">
                  ******{user.phone.nationalNumber.slice(-3)}
                </span>
              </div>
              <ErrorAlert
                error={error}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />

              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-3"
              >
                {otpInput.map((_, index) => (
                  <React.Fragment key={index}>
                    <input
                      ref={index === activeOTPIndex ? inputRef : null}
                      className="m-2 border h-10 w-10 text-center rounded-sm outline-none
                    focus-visible:shadow-none outline-none appearance-none
                    focus:border-primary spin-button-none"
                      type="number"
                      id="first"
                      onChange={(e) => handleOnChange(e, index)}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      value={otpInput[index]}
                    />
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center text-center mt-3">
                <button
                  onClick={handleSubmit}
                  className="text-white
                          bg-orange-500
                          rounded-sm
                          px-3
                          py-2
                          transition
                          hover:bg-orange-700
                          inline-flex
                          items-center
                          justify-center
                          uppercase"
                >
                  {loading ? (<LoadingOutlined className='h-4 w-4' />) : null }
                  {loading ? "Verifying..." : "Verify"}
                </button>
                <button className="flex items-center text-orange-500 cursor-pointer mt-3">
                  <span className="font-bold ">Resend code</span>
                  <ChevronDoubleRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
