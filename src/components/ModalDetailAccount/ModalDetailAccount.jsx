import React from 'react'
import Modal from '../Modal/Modal'

import "./ModalDetailAccount.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getOrderByName } from '../../redux/Slice/accountSlice'
import moment from 'moment'
import Price from '../Price/Price'
import { TbDatabaseOff } from 'react-icons/tb'
import { VscLoading } from "react-icons/vsc";

const ModalDetailAccount = ({targetAccount,setOpenModalDetailAccount}) => {
    const {listOrder, profit, totalOrders, productsSold,isLoading} = useSelector(state => state.account.getOrder)
   const dispatch = useDispatch();

   const date = new Date();

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

   useEffect(() => {
     dispatch(getOrderByName({page : 1,fullName : targetAccount.lastName + " "+ targetAccount.firstName}))
   }, [dispatch,targetAccount])
   

  return (
    <Modal onClose={setOpenModalDetailAccount} className="detailAcc">
        <div className='detailAcc__info'>
            <div className='detailAcc__info__avatar'>
                <img src={targetAccount.image.url} alt="" />
            </div>
            <div className='detailAcc__info__line'>
                <div className='detailAcc__info__line__item'>
                    Name : {`${targetAccount.lastName} ${targetAccount.firstName}`}
                </div>
                <div className='detailAcc__info__line__item'>
                    BirthDay : {targetAccount.birthday.split("-")[2]}/{targetAccount.birthday.split("-")[1]}/{targetAccount.birthday.split("-")[0]}
                </div>
            </div>
            <div className='detailAcc__info__line'>
                <div className='detailAcc__info__line__item'>
                    Address : {targetAccount.address}
                </div>
                <div className='detailAcc__info__line__item'>
                    Nationality : {targetAccount.location}
                </div>
            </div>
            <div className='detailAcc__info__line'>
                <div className='detailAcc__info__line__item'>
                    Phone : {targetAccount.phoneNumber}
                </div>
                <div className='detailAcc__info__line__item'>
                    Gender : {targetAccount.gender}
                </div>
            </div>
            <div className='detailAcc__info__line'>
                <div className='detailAcc__info__line__item'>
                    Role : {targetAccount.role === 0 ? "Staff" : targetAccount.role === 1 ? "Manager" : "Admin"}
                </div>
                <div className='detailAcc__info__line__item'>
                    PostalCode : {targetAccount.postalCode}
                </div>
            </div>
        </div>
        <div className='detailAcc__list'>
            <h2 className='detailAcc__list__header'>List Order From {month-1}/{year} To {month}/{year} </h2>
            <div className='detailAcc__list__calculate'>
                <p>Total Orders: {totalOrders}</p>
                <p>Profit: <Price price={profit}/></p>
                <p>Products Sold: {productsSold}</p>
            </div>
            <div className='detailAcc__list__result'>
                <div className="detailAcc__list__result-header">
                    <p>Date</p>
                    <p>Count</p>
                    <p>Amount</p>
                    <p>Payment</p>
                </div>
            <div className='detailAcc__list__result-body'>
                {isLoading && <div className='detailAcc__list__result-body-loading'><VscLoading /></div>}
                {listOrder.length > 0 ? listOrder.map(item => (
                    <div key={`orderAcc-${item._id}`} className='detailAcc__list__result-body-item'>
                        <p>{moment(item.created_at).format("DD/MM/YYYY")}</p>
                        <p>{item.count}</p>
                        <Price price={item.totalPrice} color={"primary"} />
                        <div className='detailAcc__list__result-body-item-payment'>
                            <p className={item.optionPayment === 0 ? "cash" : "e-wallet"}>{item.optionPayment === 0 ?"Cash" :"E-Wallet"}</p>
                        </div>
                    </div>
                )) : <div className='detailAcc__list__result-body-empty'>
                        <TbDatabaseOff />
                        <p>No Order</p>
                   </div>}
            </div>
            </div>
        </div>
       
    </Modal>
  )
}

export default ModalDetailAccount