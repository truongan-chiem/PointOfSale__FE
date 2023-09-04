import React, { useState } from 'react'
import './ModalTrending.scss'
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Price from '../Price/Price'
const ModalTrending = ({setToggleModal,target}) => {
  const {dataTrending,dataOutOfStock} = useSelector(state => state.statistic)
  const [data, setData] = useState()

  useEffect(() => {
    if(target ==='trending product'){
      setData(dataTrending)
    }
    else{
      setData(dataOutOfStock)
    }
  }, [dataOutOfStock,dataTrending,target])
  

  return (
    <Modal onClose={() => setToggleModal(false)} className="modalTrending">
      <h1 className='modalTrending__title'>{target}</h1>
      <div className='modalTrending__body'>
        {data?.map((item,index) =>(
            <ItemBody key={index} item={item} target = {target}/>
        ))}
      </div>
    </Modal>
  )
}

const ItemBody = ({item,target}) =>{
  const renderRight = () =>{
    if(target === 'trending product'){
      return(
        <div>Order : <span>{item.number}</span></div>
      )
    }
    else{
      if(item.quantity === 0){
        return (
          <div>Quantity : <span>Sold Out</span></div>
        )
      }
      else{
        return (
          <div>Quantity : <span>{item.quantity}</span></div>
        )
      }
    }
  }
  return(
    <div className='itemBody'>
      <div className='itemBody__left'>
        <img src={target === 'trending product' ? item.productId.image.url : item.image.url} alt="" />
        <div className='itemBody__left__info'>
          <h3>{target === 'trending product' ? item.productId.name : item.name}</h3>
          <Price price={target === 'trending product' ? item.productId.price : item.price} color={'primary'}/>
        </div>
      </div>
      <div className='itemBody__right'>
        {renderRight()}
      </div>
    </div>
  )
}
export default ModalTrending