import React from "react";
import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="Order Payment Info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>Payment Intent: {session.payment_intent}</p>
      <p>Payment Status: {session.payment_status}</p>
      <p>Total Amount: {session.currency.toUpperCase()} {session.amount_total/100}</p>
      <p>Stripe Customer ID: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
