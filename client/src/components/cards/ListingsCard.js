import React from "react";
import { currencyFormatter } from "../../actions/stripe";
import moment from "moment";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import PopupState, {
    bindTrigger,
    bindMenu,
    use,
  } from "material-ui-popup-state";
import IconMenu from "../shared/IconMenu";

const ListingsCard = ({ exp }) => {

  return (
    <div className="grid grid-cols-9 bg-white gap-2 flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="col-span-4">
        <div className="flex flex-row flex-grow pl-5 gap-2">
          <div className="flex flex-col items-start px-2 gap-2">
            <span className="uppercase text-md text-orange-500 font-semibold">
              {moment(new Date(exp.startDate)).format("MMMM")}
            </span>
            <span className="uppercase text-xl text-gray-500 font-semibold">
              {moment(new Date(exp.startDate)).format("DD")}
            </span>
          </div>
          <div className="relative h-16 w-24 flex-shrink-0">
            {exp.image && exp.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/experience/image/${exp._id}`}
                alt={exp.title}
                className="rounded-md object-cover h-full w-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=PREVIEW"
                alt="experience-default-image"
                className="rounded-md object-cover h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col flex-grow gap-2">
            <h4>{exp.title}</h4>
            <p className="text-xs text-gray-700">{exp.location}</p>
            <p className="text-xs text-gray-700">
              <span>
                {" "}
                {moment(new Date(exp.startDate)).format("Do MMMM YYYY")} -{" "}
              </span>
              <span>
                {moment(new Date(exp.endDate)).format("Do MMMM YYYY")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col col-span-4">
        <main className="flex justify-between grid-cols-6 bg-gray-100 text-gray-900 font-semibold p-2 rounded-sm">
          <div className="col-span-2">
            <h6>Sold</h6>
          </div>
          <div className="col-span-2">
            <h6>Gross</h6>
          </div>
          <div className="col-span-2">
            <h6>Status</h6>
          </div>
        </main>
        <main className="flex justify-between text-gray-700 grid-cols-6 p-2">
          <div className="col-span-2">
            <p>
              <span>{exp.booked} / </span>
              {exp.available}
            </p>
          </div>
          <div className="col-span-2">
            <p>
              {" "}
              {currencyFormatter({
                amount: exp.price * 100 * exp.booked,
                currency: "ugx",
              })}
            </p>
          </div>
          <div className="col-span-2">
          <span class="hover:bg-orange-700 text-white delay-100 duration-100 bg-orange-500 rounded-sm py-1 px-2 text-xs">
                    Done
          </span>
  
          </div>
        </main>
      </div>
      <div className="col-span-1 cursor-pointer flex flex-row items-center pl-12 mr-2">
      <PopupState
                variant="popover"
                popupId="demo-popup-menu"
                transition
              >
                {(popupState) => (
                  <React.Fragment>
                    <div
                      className="context-menu"
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      <DotsVerticalIcon className="h-5 w-5 hover:bg-gray-100 transition-all duration-200" />
                    </div>

                    <Menu
                      {...bindMenu(popupState)}
                      elevation={5}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      style={{ margin: 5 }}
                    >
                      <IconMenu exp={exp}  />
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
      </div>
    </div>
  );
};

export default ListingsCard;
