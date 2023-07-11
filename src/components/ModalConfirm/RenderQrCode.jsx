import { useEffect } from "react";
import { BsQrCode } from "react-icons/bs";
import QRCode from "react-qr-code";
import { io } from "socket.io-client";
import { formatNumber } from "../../utils/formatCurrency";

const socket = io(process.env.REACT_APP_API);

export const RenderQrCode = ({setOpenConfirm,handleConfirm,setMoney,totalAmount}) => {

    useEffect(() => {
        const listener = (data) =>{
            console.log(data);
            setOpenConfirm(false);
            handleConfirm();
        }

        socket.on("finished",listener)

        return () =>{
            socket.off("finished",listener)
        }
    }, [handleConfirm,setOpenConfirm])
    
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