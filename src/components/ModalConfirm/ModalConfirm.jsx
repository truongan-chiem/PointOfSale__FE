import { useEffect, useState } from "react";


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
        <EnterMoney setMoney = {setMoney} money = {money} messError = {messError} handleConfirm = {handleConfirm} />
      ) : (
        <RenderQrCode setOpenConfirm={setOpenConfirm} handleConfirm = {handleConfirm} setMoney = {setMoney} totalAmount = {totalAmount}/>
      )}
    </Modal>
  );
};



const EnterMoney = ({setMoney,money,messError,handleConfirm}) =>{

  useEffect(() => {
    const handleEnter = (e) =>{
      if(e.keyCode === 13){
        handleConfirm();
      }
      if(e.keyCode === 9){
        if(Number((money+"000").replaceAll(".","") ) < 10000000000){
          setMoney(prev => formatNumber(prev + "000"))
        }
        else{
          setMoney(formatNumber("10000000000"))
        }
      }
    }

    const handleTab = e =>{
      if(e.keyCode === 9){
        e.preventDefault();
      }
    }


    document.addEventListener("keyup",handleEnter)
    document.addEventListener("keydown",handleTab)

    return () =>{
      document.removeEventListener('keyup' , handleEnter)
      document.removeEventListener('keydown' , handleTab)
    }
  }, [handleConfirm,setMoney,money])
  
  const handleChange = e => {
    const {value} = e.target
    if(Number(value.replaceAll(".","")) < 10000000000){
        setMoney(formatNumber(value))
    }
    else if (Number(value.replaceAll(".","")) >= 10000000000){
      setMoney(formatNumber("10000000000"))
    }
  }

  return(
    <div className="modal-confirm__cash">
      <h2>Enter money</h2>
      <Input
        autoFocus
        onChange={(e) => handleChange(e)}
        value={money}
        left={"1rem"}
        placeholder={"Enter Money"}
        className={messError ? "errorMoney" : ""}
        />
      {messError && <p>{messError}</p>}
      <Button onClick={handleConfirm}>Confirm</Button>
      </div>
  )
}

export default ModalConfirm;


