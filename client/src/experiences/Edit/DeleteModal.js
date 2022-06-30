import React, { useState } from 'react'
import { Button, Modal } from "antd";
import { deleteTicket } from '../../actions/experience';
import { useDispatch, useSelector } from 'react-redux';
import { removeTicket } from '../../Redux/reducers/experiences';

const DeleteModal = ({setShowDeleteModal, showDeleteModal, ticketArray, setTicketArray, ticket, match, setDeleteError,setShowAlert }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const experience = useSelector((state) => state.experiences.singleExperience);
  const { token } = auth;
  const dispatch = useDispatch()
  const handleOk = () => {
        setShowDeleteModal(!showDeleteModal);
      };

      const handleDelete = async () => {
        const data = {
          ticketId: ticket._id
        }
        
        try {
          if(ticketArray.length > 1) {
            const res = await deleteTicket(match.params.expId, data, token)
            setTicketArray(res.data.tickets.tickets)
            setShowDeleteModal(!showDeleteModal)
          } else {
            setDeleteError(true)
            setShowDeleteModal(!showDeleteModal)
            setShowAlert(true)
          }

        } catch (error) {
          
        }
      }

      console.log(ticketArray)

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