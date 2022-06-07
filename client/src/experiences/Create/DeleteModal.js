import React from 'react'
import { Button, Modal } from "antd";

const DeleteModal = ({setShowDeleteModal, showDeleteModal, ticketArray, setTicketArray, ticket }) => {
    const handleOk = () => {
        setShowDeleteModal(!showDeleteModal);
      };

      const handleDelete = () => {
        const newTicketArray = ticketArray.filter(t => t.ticketId != ticket.ticketId);
        setTicketArray(newTicketArray)
        setShowDeleteModal(!showDeleteModal)
      }
  return (
    <Modal
    visible={showDeleteModal}
    centered
    onOk={handleOk}
    title="Delete Ticket"
    onCancel={() => setShowDeleteModal(!showDeleteModal)}
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
        onClick={() => setShowDeleteModal(!showDeleteModal)}
      >
        cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        className=" 
          text-white
          outline-none
          bg-red-500
          rounded-sm
          transition
          hover:bg-red-900
          uppercase"
        onClick={handleDelete}
      >
        Delete
      </Button>,
    ]}
  >
<p>
    Are You sure You want to delete this ticket? This action is irriversible, click Delete to confirm or Cancel to go back
</p>

  </Modal>
  )
}

export default DeleteModal