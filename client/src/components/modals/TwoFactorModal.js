import React, { useState } from "react";
import { Button, Modal } from "antd";
import PhoneInput, {getCountryCallingCode,getCountries,  formatPhoneNumberIntl, isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import { useDispatch } from "react-redux";
import { enableTwofactorAuth } from "../../actions/auth";
const TwoFactorModal = ({ auth, showModal, setShowModal }) => {
    const {user, token} = auth
    const [phoneNumber, setPhoneNumber] = useState("")
    const [localNumber, setLocalNumber]= useState("")
    const [countryCode, setCountryCode]= useState("")
    const dispatch = useDispatch()

  const handleEnableTwofactorAuth = async () => {
    const internationalNumber = parsePhoneNumber(phoneNumber)
    const data = {
      internationalNumber,
      email: user.email
    }
    try {
      const res = await enableTwofactorAuth(data, token)
      console.log(res.data)
      // dispatch(setTwoFactorAuth(res.data))
    } catch (error) {
      
    }
    // {value && isPossiblePhoneNumber(value) ? 'true' : 'false'}
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
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
    </Modal>
  );
};

export default TwoFactorModal;
