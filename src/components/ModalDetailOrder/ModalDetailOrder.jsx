import React, { useEffect, useState } from 'react'
import './ModalDetailOrder.scss'

import Modal from '../Modal/Modal'
import Price from '../Price/Price'
import { useSelector } from 'react-redux'

const ModalDetailOrder = ({setOpenDetail ,id}) => {
    const listOrder = useSelector(state => state.history.listData)
    const [order, setOrder] = useState(null)
    let totalAmount = 0;
    let subTotal = 0;
    useEffect(() => {
        const item = listOrder.find(item => item._id === id)
        setOrder(item)
    }, [id,listOrder])

  return (
    <Modal className='detail-order' onClose={() => setOpenDetail(false)}>
        <h2 className="detail-order__header">
            Order ID : <span>{order?._id}</span>
        </h2>
        <div className='detail-order__staff'>
            <h3>Staff Detail</h3>
           <div className='detail-order__staff__info'>
                <div>
                    <div>
                        <p>Name </p>
                        <h4>{order?.owenId.lastName} {order?.owenId.firstName}</h4>
                    </div>
                    <div>
                        <p>Role </p>
                        <h4>{order?.owenId.role === 0 ? "Staff" : order?.owenId.role === 1 ? "Manager" : "Admin"}</h4>
                    </div>
                    <div>
                        <p>Gender </p>
                        <h4>{order?.owenId.gender}</h4>
                    </div>
                </div>
                <div className='detail-order__staff__info__img'><img src={order?.owenId.image.url} alt="" /></div>
           </div>
        </div>
        <div className='detail-order__invoice'>
            <h3>Invoice Detail</h3>
            <div className='detail-order__invoice__info'>
                <div className='detail-order__invoice__info__issued'>
                    <p>Issued On :</p>
                    <h4>11 March, 2023</h4>
                </div>
                <div className='detail-order__invoice__info__payment'>
                    <h4>Payment methods :</h4>
                    <div>
                        {order?.optionPayment === 0 ? "Cash" : order?.optionPayment === 1 ? "Debit Card" : "E-Wallet"}
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.orders.map((item,index) =>{
                        totalAmount = item.productId.price * item.number
                        subTotal += totalAmount
                        return(
                                <tr key={index}>
                                    <td>{item.productId._id}</td>
                                    <td>{item.productId.name}</td>
                                    <td><Price price={item.productId.price} color='black'/> </td>
                                    <td>{item.number}</td>
                                    <td><Price price={totalAmount} color="black" /></td>
                                </tr>
                                )
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>SubTotal</td>
                        <td><Price price={subTotal} color={'black'} /></td>
                    </tr>
                </tfoot>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Tax(10%)</td>
                        <td><Price price={subTotal * 0.1 } color='black' /></td>
                    </tr>
                </tfoot>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Total</td>
                        <td><Price price={subTotal + subTotal * 0.1} color="black" /></td>
                    </tr>
                </tfoot>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Cash</td>
                        <td><Price price={order?.cash} color="black" /></td>
                    </tr>
                </tfoot>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Refunds</td>
                        <td><Price price={order?.cash - (subTotal + subTotal * 0.1)} color="black" /></td>
                    </tr>
                </tfoot>
                
               
            </table>
        </div>
    </Modal>
  )
}

export default ModalDetailOrder