import React, { useState } from "react";
import { createStripeAccount } from "../../actions/stripe";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {GrStripe} from 'react-icons/gr'

const PaymentComponent = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  console.log(auth);
  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createStripeAccount(auth.token);
      window.location.href = res.data;
    } catch (error) {
      console.log(error);
      toast.error("stripe connection failed, try again");
      setLoading(false);
    }
  };
  return (
    <div>
      {!auth?.stripe_seller && !auth?.stripe_seller?.charges_enabled ? (
        <div className="cursor-pointer">
          <button
            disabled={loading}
            onClick={handleClick}
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
            {loading ? "Processing" : "Setup Stripe Payouts"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentComponent;
