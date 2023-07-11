import { useState } from "react";


import Modal from "../Modal/Modal";
import Input from "../Input/Input";

import { formatNumber } from "../../utils/formatCurrency";
import Button from "../Button/Button";
import "./ModalConfirm.scss";
import { RenderQrCode } from "./RenderQrCode";


const ModalConfirm = ({
  handlePrintBill,
  setOpenConfirm,
  totalAmount,
  money,
  setMoney,
  optionPayment,
}) => {
  const [messError, setMessError] = useState();
  const handleConfirm = () => {
    if (Number(money.replaceAll(".", "")) < Number(totalAmount)) {
      console.log("khong du tien");
      setMessError("Not Enough Money!!!");
    } else {
      handlePrintBill();
      setMessError();
    }
  };
  
  return (
    <Modal
      className={`modal-confirm ${optionPayment === 1 ? "qrcode" : ""}`}
      onClose={() => setOpenConfirm(false)}
    >
      {optionPayment === 0 ? (
        <div className="modal-confirm__cash">
          <h2>Enter money</h2>
          <Input
            onChange={(e) => setMoney(formatNumber(e.target.value))}
            value={money}
            left={"1rem"}
            placeholder={"Enter Money"}
            className={messError ? "errorMoney" : ""}
          />
          {messError && <p>{messError}</p>}
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      ) : (
        <RenderQrCode setOpenConfirm={setOpenConfirm} handleConfirm = {handleConfirm} setMoney = {setMoney} totalAmount = {totalAmount}/>
      )}
    </Modal>
  );
};

export default ModalConfirm;


