import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../../actions/auth";
import LoginForm from "../../components/forms/LoginForm";
import { useDispatch } from "react-redux";
import LoginSVG from "../../images/LoginSvg";
import PageTitle from "../../components/Typography/PageTitle";
import LoginDetails from "./LoginDetails";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({ email, password });
      if (res.data) {
        //save to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        //save to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        setShowAlert(false)
        history.push("/dashboard");
      }
    } catch (error) {
      setError(error.response.data.error);
      setShowAlert(true)
    }
  };
  return (
   <>
       <main className="max-w-full mx-auto shadow-xs bg-white rounded-md p-3 mt-2">
      <LoginDetails />
    </main>
    {/* <div className="container mt-5 flex flex-col text-center">
    <PageTitle>
    Login
    </PageTitle>
      </div>
    <section class="relative ">
      <div class="container pl-5 pt-2 overflow-hidden mt-5 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <div class="flex justify-center flex-wrap gap-6">
            <LoginSVG />
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              error={error}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </div>
        </div>
      </div>
    </section> */}
   </>
  );
};

export default Login;
