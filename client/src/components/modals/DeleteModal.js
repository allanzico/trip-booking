import React from "react";
import { Modal } from "antd";

const DeleteModal = ({ showModal, setShowModal, id}) => {
  return (
    <Modal
      visible={showModal}
      title="Order Payment Info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>TEST</p>
    </Modal>
  );
};

export default DeleteModal;
