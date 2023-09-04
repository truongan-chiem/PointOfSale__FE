import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

import { BsCash } from "react-icons/bs";
import { RiQrScan2Line } from "react-icons/ri";
import { FaRegSadCry } from "react-icons/fa";

import ItemOrderBill from "../ItemOrderBill/ItemOrderBill";
import CardStaff from "../CardStaff/CardStaff";
import Price from "../Price/Price";
import Button from "../Button/Button";


import { clearBill, printBill } from "../../redux/Slice/productSlice";

import "./Bill.scss";
import useWindowSize from "../../hook/useWindowSize";
import ModalConfirm from "../ModalConfirm/ModalConfirm";

const Bill = (props,ref) => {
  const { order = [], type, valueOptionPayment = 0 } = props;
  const [optionPayment, setOptionPayment] = useState(valueOptionPayment);
  const dispatch = useDispatch();
  const [idOrder, setIdOrder] = useState("")
  const [openConfirm, setOpenConfirm] = useState(false)
  const [money, setMoney] = useState()
  const userInformation = useSelector((state) => state.user.information);
  const billRef = useRef();
  const listOptionPayment = [
    {
      display: "Cash",
      icon: <BsCash />,
    },
    {
      display: "E-Wallet",
      icon: <RiQrScan2Line />,
    },
  ];
  useEffect(() => {
    setOptionPayment(valueOptionPayment);
  }, [valueOptionPayment]);
  const subTotal = order.reduce((total, item) => total + item.price * item.number, 0);
  const tax = Number(subTotal / 10);
  const total = Number(subTotal) + tax;

  const handlePrintPDF = useReactToPrint({
    content: () => billRef.current,
    bodyClass : "billPDF",
    documentTitle:"bill",
    onAfterPrint : () => {
      setIdOrder("");
      setOpenConfirm(false);
      dispatch(clearBill());
      setMoney();
      setOptionPayment(0);
    }
  });

  const handlePrintBill = async () => {
  
      const result = await dispatch(printBill({optionPayment:optionPayment,cash : Number(money.replaceAll('.','')) , totalPrice : total})).unwrap();
      if(result){
        setIdOrder(result._id)
      }
    
  };
  const handleOpenModalConfirm = () =>{
    if (order.length > 0) {
      setOpenConfirm(true)
    }
  }
  useEffect(() => {
    if(idOrder !== ""){
      handlePrintPDF();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrder])
  
  // get current day
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;
  const isToggle = useSelector(state => state.toggleBill.isToggle)
  const {width} = useWindowSize();
  useEffect(() => {
    const contentBody = document.getElementsByClassName('tab-content__body')[0]
    if(contentBody){
        if(isToggle){
          contentBody.style.overflow = "hidden"
        }
    }
    return () =>{
      if(contentBody){
        contentBody.style.overflow = "overlay"
      }
    }
  }, [isToggle])

  useEffect(() => {
    const contentBody = document.getElementsByClassName('tab-content__body')[0]
    if(width > 768 && contentBody){
      contentBody.style.overflow = "overlay"
    }
  }, [width])
  
  return (
    <div ref={ref}>
      <div className={`bill`} >
        <div ref={billRef}>
          <div className="bill__info">
            {/* header bill */}
            <CardStaff user={userInformation} />
            <div className="bill__info__header">
            <div style={{display : 'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h3>Orders ID</h3>
                <p className="billPDF__day">{formattedToday}</p>
            </div>
              <h1>#{idOrder}</h1>
            </div>
            {/* body bill */}
            <h1 className="bill__info__title">Bills</h1>
           
            <div className="bill__info__list-choose">
              {order.length > 0 ? (
                order.map((item, index) => (
                  <ItemOrderBill key={`cardOrder-${index}`} {...item} type={type} />
                ))
              ) : (
                <div className="emptyOrder">
                  <span>Your Order Empty !</span>
                  <FaRegSadCry />
                </div>
              )}
            </div>
            <div className="bill__info__row subtotal">
              <h3>Subtotal</h3>
              <Price price={subTotal} color="black" />
            </div>
            <div className="bill__info__row tax">
              <h3>Tax (10%)</h3>
              <Price price={tax} color="gray" />
            </div>
            <div className="divider" />
            <div className="bill__info__row total">
              <h2>Total</h2>
              <Price price={total} color="red" />
            </div>
            <div className="billPDF__cash">
              <div className="bill__info__row cash">
                  <h3>Cash</h3>
                  <Price price={Number(money?.replaceAll('.',''))} color={'black'}/>
              </div>
              <div className="divider" />
              <div className="bill__info__row refunds">
                  <h3>Refunds</h3>
                  <Price price={Number(money?.replaceAll('.','')) - total} color={'green'}/>
              </div>
            </div>
          </div>
          {/* section payment bill */}
          <div className="bill__payment">
            <h1>Payment Method</h1>
            {/* display payment method in PDF */}
            <button className="billPDF__payment">{listOptionPayment[optionPayment].display}</button>
            {/* end display */}
            <div className="bill__payment__options">
              {listOptionPayment.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    type === "home" && setOptionPayment(index);
                  }}
                  type={"shortcut"}
                  icon={item.icon}
                  className={index === optionPayment ? "active" : "disable"}
                >
                  {item.display}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Button className="bill__payment__printbill" onClick={handleOpenModalConfirm}>
          Print Bills
        </Button>
      </div>
     {openConfirm &&  <ModalConfirm
      handlePrintBill = {handlePrintBill} 
      setOpenConfirm = {setOpenConfirm} 
      totalAmount = {total} 
      money = {money}
      setMoney = {setMoney}
      optionPayment = {optionPayment}
      /> }
    </div>
  );
};

export default forwardRef(Bill);
