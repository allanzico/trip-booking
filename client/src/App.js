import { Switch, BrowserRouter, Route, Router } from "react-router-dom";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup";
import Home from "./booking/Home";
import "./App.less";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import StripeCallback from "./stripe/StripeCallback";
import Experiences from "./experiences/View/Experiences";
import ResponsiveNav from "./components/navigation/ResponsiveNav";
import ViewExperience from "./experiences/View/ViewExperience";

import StripeCancel from "./stripe/StripeCancel";
import StripeSuccess from "./stripe/StripeSuccess";
import SearchResults from "./search/SearchResults";
import Messaging from "./messaging/Messaging";
import ExperienceView from "./experiences/View/ExperienceView";
import ResetPassword from "./auth/ResetPassword";
import ForgotPassword from "./auth/ForgotPassword";
import MainDashboard from "./dashboard/MainDashboard";
import { Toaster } from "react-hot-toast";
import Chat from "./components/Chat";
import Register from "./auth/Signup/Register";
import RegisterMerchant from "./merchant/register/RegisterMerchant";
import DashboardHome from "./dashboard/DashboardHome";
import CheckoutComponent from "./checkout/CheckoutComponent";
import TwoFactorAuth from "./auth/Login/TwoFactorAuth";
import MainFooter from "./components/footers/MainFooter";
import OrderSuccess from "./checkout/OrderSuccess";
import ViewBookings from "./user-bookings/ViewBookings";
import PaymentComponent from "./components/payment/PaymentComponent";
import MiddleContent from "./dashboard/MiddleContent";

function App() {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      <ResponsiveNav />
      <Toaster />
      <Switch>
        <Route exact path="/" component={Home} />
       {/* <Route exact path="/experiences" component={Experiences} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify" component={TwoFactorAuth} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/register-company" component={RegisterMerchant}/>
        <Route exact path="/search-result" component={SearchResults} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
 
        <Route
          exact
          path="/reset-password/:resetToken"
          component={ResetPassword}
        />
        <Route exact path="/experience/:expId" component={ExperienceView} />
        <Route exact path="/booking/:bookingId" component={ViewBookings} />
     
        {/* <PrivateRoute
          exact
          path="/booking/:bookingId"
          component={ViewBooking}
        /> */}
        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute exact path="/dashboard" component={MainDashboard} />
        <PrivateRoute exact path="/messaging" component={Messaging} />
        <PrivateRoute exact path="/checkout" component={CheckoutComponent} />
        <PrivateRoute exact path="/order-success" component={OrderSuccess} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute
          exact
          path="/stripe/success/:expId"
          component={StripeSuccess}
        />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
      </Switch>
      <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
