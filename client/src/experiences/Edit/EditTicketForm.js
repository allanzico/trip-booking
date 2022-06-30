import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { currencyFormatter } from "../../actions/stripe";
import PopupState, {
  bindTrigger,
  bindMenu,
  use,
} from "material-ui-popup-state";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { PencilAltIcon } from "@heroicons/react/solid";
import { ShareIcon, TrashIcon } from "@heroicons/react/outline";
import Menu from "@mui/material/Menu";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import DeleteModal from "./DeleteModal";
import EditTicketModal from "./EditTicketModal";
import CreateTicketModal from "../Create/CreateTicketModal";
import ErrorAlert from "../../components/shared/ErrorAlert";

const EditTicketForm = ({ setTicketArray, ticketArray, match }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [ticketData, setTicketData] = useState({
    ticketId: "",
    title: "",
    price: "",
    available: "",
    minTickets: "",
    maxTickets: "",
  });

  const handleTicketModal = (e) => {
    e.stopPropagation();
    setShowModal(!showModal);
  };

  const handleOpenDeleteModal = (e) => {
    e.stopPropagation();
    setShowDeleteModal(!showDeleteModal);
  };

  const handleOpenEditModal = (e) => {
    e.stopPropagation();
    setShowEditModal(!showEditModal);
  };
  return (
    <div className="flex flex-col">
      <div className="col-span-6">
        <hr />
        <h3 className="text-xs font-bold uppercase leading-8 text-gray-500">
          Add tickets
        </h3>
        <hr className="mb-3" />
        <div class="py-3 text-left">
          <button
            onClick={handleTicketModal}
            type="button"
            class="text-gray-900 bg-transparent border-1 border-orange-500 font-medium rounded-sm text-sm px-3 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          >
            <PlusIcon className="w-4 h-4 mx-2" />
            Create New Ticket
          </button>
        </div>

        {showModal && (
          <CreateTicketModal
            showModal={showModal}
            setShowModal={setShowModal}
            ticketData={ticketData}
            setTicketData={setTicketData}
            ticketArray={ticketArray}
            setTicketArray={setTicketArray}
          />
        )}
      </div>
      {deleteError && (
        <ErrorAlert
          error={
            "You can not delete the last ticket, at least 1 ticket type is required"
          }
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
      <div className="col-span-6">
        {ticketArray && ticketArray.length >= 1
          ? ticketArray.map((ticket) => (
              <div
                key={ticket.ticketId}
                className="grid grid-cols-9 bg-white gap-2 flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t"
              >
                <div className="col-span-4 ">
                  <div className="flex flex-col items-start">
                    <h5 className="text-lg font-semibold">{ticket.title}</h5>
                    {/* <p className="text-xs py-2 text-gray-500">12/02/2022 - 12/02/2022</p> */}
                  </div>
                </div>
                <div className="col-span-2 ">{ticket.available} tickets</div>
                <div className="col-span-2">
                  <p className="text-md font-semibold text-orange-500">
                    {currencyFormatter({
                      amount: ticket.price * 100,
                      currency: "ugx",
                    })}
                  </p>
                </div>
                <div className="col-span-1 ">
                  <div className="flex flex-col items-end">
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
                              <MenuList>
                                <MenuItem onClick={handleOpenEditModal}>
                                  <ListItemIcon>
                                    <PencilAltIcon className="h-4 w-4" />
                                  </ListItemIcon>
                                  <ListItemText>
                                    <p className="text-sm">Edit</p>
                                  </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleOpenDeleteModal}>
                                  <ListItemIcon>
                                    <TrashIcon className="h-4 w-4" />
                                  </ListItemIcon>
                                  <ListItemText>
                                    <p className="text-sm">Delete</p>
                                  </ListItemText>
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </div>
                    {showDeleteModal && (
                      <DeleteModal
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        ticketArray={ticketArray}
                        setTicketArray={setTicketArray}
                        ticket={ticket}
                        match={match}
                        setDeleteError={setDeleteError}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                      />
                    )}
                    {showEditModal && (
                      <EditTicketModal
                        ticket={ticket}
                        setTicketArray={setTicketArray}
                        ticketArray={ticketArray}
                        showEditModal={showEditModal}
                        setShowEditModal={setShowEditModal}
                        match={match}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default EditTicketForm;
