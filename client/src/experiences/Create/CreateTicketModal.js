import React, { useState } from "react";
import { Button, Modal } from "antd";
import { v4 as uuidv4 } from 'uuid';

const CreateTicketModal = (props) => {
    const handleOk = () => {
      setShowModal(!showModal);
    };
const { showModal, setShowModal, ticketData, setTicketData, setTicketArray, ticketArray } = props
  const {title, price, available, minTickets, maxTickets} = ticketData

  const handleChange = (evt) => {
    setTicketData({
      ...ticketData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleTicketSave = (evt) => {
      evt.preventDefault()
      ticketArray.push({...ticketData, ticketId: uuidv4()})
      setTicketData({})
      setShowModal(!showModal)
  }
  
  return (
      <Modal
        visible={showModal}
        centered
        onOk={handleOk}
        title="Add new ticket"
        onCancel={() => setShowModal(!showModal)}
        footer={[
          <Button
            key="back"
            className="
              bg-gray-200
              rounded-sm
              transition
              outline-none
              hover:border-gray-500
              hover:text-gray-500
              uppercase"
            onClick={() => setShowModal(!showModal)}
          >
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className=" 
              text-white
              outline-none
              bg-orange-500
              rounded-sm
              transition
              hover:bg-orange-700
              uppercase"
              onClick={handleTicketSave}
          >
            Save
          </Button>,
        ]}
      >
    
    <div className="flex flex-col">
              {/* Title input */}
      <div className="col-span-6">
        <div className="relative mb-4 ">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={title}
            className="
                    peer
                    placeholder-transparent
                    w-full
                    rounded-sm
                    py-2
                    px-2
                    border border-gray
                    outline-none
                    focus:outline-orange-500
                    focus:outline-1
                    "
          />
          <label
            for="title"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Title
          </label>
        </div>
      </div>

       {/* Numbers input */}
      <div className="grid grid-cols-6 md:space-x-4">
        <div className="relative mb-4 col-span-6 sm:col-span-6 md:col-span-3">
          <input
            type="number"
            placeholder="price"
            name="price"
            onChange={handleChange}
            value={price}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border 
                  border-gray
                  outline-none
                  focus:outline-orange-500
                  focus:outline-1
                  "
          />
          <label
            for="price"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Price
          </label>
        </div>
        <div className="relative mb-4 col-span-6 sm:col-span-6 md:col-span-3">
          <input
            type="number"
            placeholder="available tickets"
            name="available"
            onChange={handleChange}
            value={available}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary
                  "
          />
          <label
            for="available"
            className="absolute bg-white left-2 px-2 -top-2.5 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Available tickets
          </label>
        </div>
      </div>
             {/* Numbers input */}
        <div className="relative mb-4 col-span-6">
          <input
            type="number"
            placeholder="min tickets"
            name="minTickets"
            onChange={handleChange}
            value={minTickets}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border 
                  border-gray
                  outline-none
                  focus:outline-orange-500
                  focus:outline-1
                  "
          />
          <label
            for="price"
            className="absolute bg-white left-2 px-2 -top-2.5 text-gray-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Min tickets per person
          </label>
        </div>
        <div className="relative mb-4 col-span-6">
          <input
            type="number"
            placeholder="Max tickets"
            name="maxTickets"
            onChange={handleChange}
            value={maxTickets}
            className="
                  peer
                  placeholder-transparent
                  w-full
                  rounded-sm
                  py-2
                  px-2
                  border border-gray
                  outline-none
                  hover:outline-orange-500
                  hover:outline-1
                  focus-visible:shadow-none
                  focus:border-primary
                  "
          />
          <label
            for="available"
            className="absolute bg-white left-2 px-2 -top-2.5 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all 
                    peer-focus:-top-2.5 
                    peer-focus:text-orange-500 
                    peer-focus:text-xs 
                    peer-focus:-z-1 
                    peer-focus:duration-300 
                    peer-focus:origin-0"
          >
            Max tickets per person
          </label>
        </div>
    </div>
    
      </Modal>
    );
}

export default CreateTicketModal