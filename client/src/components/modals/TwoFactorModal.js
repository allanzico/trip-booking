import React, { useState } from "react";
import { Button, Modal } from "antd";
import PhoneInput, {getCountryCallingCode,getCountries } from 'react-phone-number-input'


const TwoFactorModal = ({ auth, showModal, setShowModal }) => {
    const [value, setValue] = useState()
  const handleEnableTwofactorAuth = async () => {
    console.log(value)
    console.log(getCountries())
  };


  const handleOk = () => {
    setShowModal(!showModal);
    
  };

  return (
    <Modal
      visible={showModal}
      centered
      onOk={handleOk}
      title="Enable 2 factor authentication"
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
          onClick={handleEnableTwofactorAuth}
        >
          Save
        </Button>,
      ]}
    >

      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry="UG"
        value={value}
        onChange={setValue}
        className="
        w-full
        rounded-sm
        py-2
        px-[14px]
        border border-gray
        outline-none
        hover:outline-orange-500
        hover:outline-1
        focus-visible:shadow-none
        focus:border-primary
        
        "
      />
    </Modal>
  );
};

export default TwoFactorModal;
