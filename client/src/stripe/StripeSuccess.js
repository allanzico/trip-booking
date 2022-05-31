import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { stripeSuccessRequest } from '../actions/stripe'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccess = ({match, history}) => {
  const {auth : {token}} = useSelector((state) => ({...state}))

  // const [first, setfirst] = useState(second)
  
  useEffect(() => {
    stripeSuccessRequest(token, match.params.expId).then(res => {
      if (res.data.success) {
        history.push('/dashboard#/user-experience-bookings')
      }else {
        history.push('/stripe/cancel')
      }
      
    })
  }, [match.params.expId])
  return (
    <div className="container">
    <div className="d-flex justify-content-center p-5">
    <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
  </div>
  )
}

export default StripeSuccess