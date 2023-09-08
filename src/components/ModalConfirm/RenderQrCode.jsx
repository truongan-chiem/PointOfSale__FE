import { useEffect } from "react";
import { BsQrCode } from "react-icons/bs";
import QRCode from "react-qr-code";
import { formatNumber } from "../../utils/formatCurrency";
import { useSelector } from "react-redux";
import {Notificationz} from '../Notification/Notification'
import { useState } from "react";
import API from '../../API'
export const RenderQrCode = ({setOpenConfirm,handleConfirm,setMoney,totalAmount}) => {
    const socket = useSelector(state => state.socket.socket)
    const [ip, setIp] = useState("")
    const [time, setTime] = useState(600)
    useEffect(() => {
        const listener = () =>{
            Notificationz("Payment Success!!!")
            setOpenConfirm(false);
            handleConfirm();
        }

        socket.on("finished",listener)

        return () =>{
            socket.off("finished",listener)
        }
    }, [handleConfirm,setOpenConfirm,socket])
    
    useEffect(() => {
        setMoney(formatNumber(String(totalAmount)))
    }, [setMoney,totalAmount])
    
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      
      if(time <=0){
        setOpenConfirm(false)
      }

      return () => clearInterval(interval);

    }, [time,setOpenConfirm]);
    const getIp = async () =>{
      const data = await API.get("/ip")
      setIp(data.data?.ip);
    }
    getIp();
  return (
    <div className="modal-confirm__qrcode">
      <h2 className="modal-confirm__qrcode__title">Scan QR To Purchase</h2>
      <QRCode size={200} value={`http://${ip}:3000/qrcode`} viewBox={`0 0 256 256`} />
      <div className="modal-confirm__qrcode__support">
        <BsQrCode />
        <p>Use a camera app that supports QR code to scan the code</p>
      </div>
      <div className="modal-confirm__qrcode__count">
        <h4>Orders will expire later:</h4>
        <div className="modal-confirm__qrcode__count__wrap">
          <div className="modal-confirm__qrcode__count__wrap__item">
            <p>{Math.floor(time/60)}</p>
            <p>Minutes</p>
          </div>
          <div className="modal-confirm__qrcode__count__wrap__item">
            <p>{time - (Math.floor(time/60) * 60)}</p>
            <p>Second</p>
          </div>
        </div>
      </div>
    </div>
  );
};