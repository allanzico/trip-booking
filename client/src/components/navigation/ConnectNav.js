import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../../actions/stripe";
import { GiCash } from "react-icons/gi";
const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccountBalance(token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(token);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
      <card class="w-full flex flex-col md:mr-2 lg:mr-2">
        <content class="grid grid-cols-1 ">
          <div class=" w-full flex flex-col">
            <subject class="font-bold text-lg">
              welcome,{" "}
              <span className="text-orange-500 uppercase"> {user.name} </span>
            </subject>
          </div>
        </content>

        <footer class="flex flex-row pt-7 gap-1 items-center">
          <span class="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-sm py-1 px-2 text-xs">
            {`Joined ${moment(user.createdAt).fromNow()}`}
          </span>
        </footer>
      </card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <card class="w-full flex flex-col mb-4 col-span-2 mt-4">
              <div class="bg-white rounded-md shadow-sm w-full shadow-md py-2 px-4">
                <div class="flex flex-row justify-between items-center">
                  <div>
                    <h6 class="text-l uppercase font-bold">Balance</h6>
                    <h4 class="text-black text-4xl font-bold text-left">
                      {balance &&
                        balance.pending &&
                        balance.pending.map((bal, i) => {
                          return <span key={i}>{currencyFormatter(bal)}</span>;
                        })}
                    </h4>
                  </div>
                  <div>
                    <GiCash className="text-4xl text-orange-500" />
                  </div>
                </div>
              </div>
            </card>
            {/* <card class="w-full flex flex-col mb-4 md:ml-3 lg:ml-2  ">
              <div class="bg-white rounded-md shadow-md w-full shadow-md py-2 px-4">
                <div class="flex flex-row justify-between items-center">
                  <div>
                    <h6 class="text-l uppercase font-bold">something</h6>
                    <h4 class="text-black text-4xl font-bold text-left">0</h4>
                  </div>
                  <div>
                    <GiCash className="text-4xl text-orange-500" />
                  </div>
                </div>
              </div>
            </card> */}
          </>
        )}
    </div>
  );
};

export default ConnectNav;
