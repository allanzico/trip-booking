import React, { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountStatus } from '../actions/stripe'
import { updateLocalStorage } from '../actions/auth'

const StripeCallback = ({history}) => {
const {auth} = useSelector((state) => ({...state}))
const dispatch = useDispatch();

useEffect(() => {
if (auth && auth.token) accountStatus();
},[auth]);

const accountStatus = async () => {
    try {
       const res =  await getAccountStatus(auth.token)
      await updateLocalStorage(res.data, () => {

        //update Redux
        dispatch({
            type: 'LOGGED_IN_USER',
            payload:res.data
        })
        window.location.href = "/dashboard#/dashboard/seller";
       });
    //    console.log(res)
      
    } catch (error) {
        console.log(error)
    }
}
    return (
    <div  className='d-flex justify-content-center p-5'>
        <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
  )
}

export default StripeCallback