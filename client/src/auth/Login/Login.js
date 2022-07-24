import React, { useState } from "react";
import { login } from "../../actions/auth";
import LoginSVG from "../../images/LoginSvg";
import PageTitle from "../../components/Typography/PageTitle";
import LoginDetails from "./LoginDetails";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(true)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      let res = await login({ email, password });
      if (res.data) {
        setShowAlert(false)
        history.push({pathname: `/verify`, state: res.data});
        setLoading(false)
      }
    } catch (error) {
      setError(error.response.data.error);
      setShowAlert(true)
    }
  };

  return (
   <>
    <div className="container mt-5 flex flex-col text-center">
    <PageTitle>
    Login
    </PageTitle>
      </div>
    <section class="relative ">
      <div class="container pl-5 pt-2 overflow-hidden mt-5 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="flex flex-1 flex-col items-center lg:items-start">
          <div class="flex justify-center flex-wrap gap-6">
            <LoginSVG />
            <LoginDetails
              handleSubmit={handleSubmit}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              error={error}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
   </>
  );
};

export default Login;
