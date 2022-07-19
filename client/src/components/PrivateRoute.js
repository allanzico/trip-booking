import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token && auth.user.verificationStatus === "approved" ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
