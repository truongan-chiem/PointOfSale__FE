import React, { useEffect } from 'react'
import logo from '../../asset/logo.png'
import './ConfirmQRCode.scss'
import {BsCheckCircle} from 'react-icons/bs'
// import { io } from 'socket.io-client'

// const socket = io(process.env.REACT_APP_API);
const ConfirmQRCode = () => {

  useEffect(() => {

    // socket.emit("thanh toan" , {message : "finshed!"})
    
  }, [])
  

  return (
    <div className='cf-qrcode'>
        <div className="cf-qrcode__body">
            <BsCheckCircle className='cf-qrcode__body__check'/>
            <h3>Thanh toán thành công !</h3>
            <p>Thông tin thanh toán đã được lưu lại.</p>
            <img src= {logo} alt="" className='cf-qrcode__body__img'/>
        </div>
    </div>
  )
}

export default ConfirmQRCode