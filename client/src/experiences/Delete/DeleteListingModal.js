import React from 'react'
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { deleteSingleExperience} from '../../actions/experience'
import { removeExperience } from '../../Redux/reducers/experiences';

const DeleteListingModal = ({setShowDeleteModal, showDeleteModal, exp}) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const dispatch = useDispatch();
  const handleOk = () => {
        setShowDeleteModal(!showDeleteModal);
      };

const handleDeleteExperience = async () => {
try {
 await deleteSingleExperience(exp._id, token)
  dispatch(removeExperience(exp._id))
} catch (error) {
  
}
}
      const handleDelete = () => {
        handleDeleteExperience()
        setShowDeleteModal(!showDeleteModal)
      }
  return (
    <Modal
    visible={showDeleteModal}
    centered
    onOk={handleOk}
    title={`Delete ${exp.title}`}
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
    Are You sure You want to delete this listing? This action is irriversible, click Delete to confirm or Cancel to go back
</p>

  </Modal>
  )
}

export default DeleteListingModal