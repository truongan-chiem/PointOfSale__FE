import React, { useEffect } from 'react'
import logo from '../../asset/logo.png'
import './ConfirmQRCode.scss'
import {BsCheckCircle} from 'react-icons/bs'
import { useSelector } from 'react-redux'

const ConfirmQRCode = () => {
  const socket = useSelector(state => state.socket.socket)
  
  useEffect(() => {
   if(socket){
      socket.emit("thanh toan" , {message : "finshed!"})
    }
    
  }, [socket])
  

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