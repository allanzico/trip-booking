import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SellerRoute = ({ ...rest }) => {
    const { auth } = useSelector((state) => ({ ...state }));
    return auth && auth.token && auth.user.role === "seller" ? <Route {...rest} /> : <Redirect to="/" />;
}

export default SellerRoute