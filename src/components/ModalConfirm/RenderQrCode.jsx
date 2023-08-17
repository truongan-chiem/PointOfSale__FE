import { useEffect } from "react";
import { BsQrCode } from "react-icons/bs";
import QRCode from "react-qr-code";
import { formatNumber } from "../../utils/formatCurrency";
import { useSelector } from "react-redux";
import {Notificationz} from '../Notification/Notification'
export const RenderQrCode = ({setOpenConfirm,handleConfirm,setMoney,totalAmount}) => {
    const socket = useSelector(state => state.socket.socket)

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
    
  
  
  
  return (
    <div className="modal-confirm__qrcode">
      <h2 className="modal-confirm__qrcode__title">Quét mã QR để thanh toán</h2>
      <QRCode size={200} value={window.location.origin + `/qrcode`} viewBox={`0 0 256 256`} />
      <div className="modal-confirm__qrcode__support">
        <BsQrCode />
        <p>Sử dụng ứng dụng camare hỗ trợ QR code để quét mã</p>
      </div>
      <div className="modal-confirm__qrcode__count">
        <h4>Đơn hàng sẽ hết hạn sau:</h4>
        <div className="modal-confirm__qrcode__count__wrap">
          <div className="modal-confirm__qrcode__count__wrap__item">
            <p>09</p>
            <p>Phút</p>
          </div>
          <div className="modal-confirm__qrcode__count__wrap__item">
            <p>02</p>
            <p>Giây</p>
          </div>
        </div>
      </div>
    </div>
  );
};