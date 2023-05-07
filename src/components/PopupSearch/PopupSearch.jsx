import React from 'react'
import {useDispatch} from 'react-redux'
import { addItemToBill } from '../../redux/Slice/productSlice'
import Price from '../Price/Price'
import soldOut from '../../asset/soldout.png'
import './PopupSearch.scss'
const PopupSearch = ({resultSearch}) => {
  return (
    <div className='popupSearch'>
        <p className="popupSearch__header">{`${resultSearch.length} results`}</p>
        <div className='popupSearch__body'>
            {resultSearch.length > 0 ? resultSearch.map((item ,index) =>(
                <Item key={index} img={item.image.url} name = {item.name} price={item.price} _id={item._id} quantity = {item.quantity}/>
            )) : (
                <p className='popupSearch__body__noResult'>Sorry ! No results found !</p>
            )}
        </div>
    </div>
  )
}

const Item = ({img,name,price,_id,quantity}) =>{
    const dispatch = useDispatch();


    return(
        <div className='item' onMouseDown={() => quantity > 0 && dispatch(addItemToBill({_id}))}>
            {quantity <= 0 && <img src={soldOut}  alt='' className='item__soldOut'/>}
            <img src={img} alt="" className='item__img'/>
            <div className='item__info'>
                <p className='item__info__name'>{name}</p>
                <Price price={price} className='item__info__price' />
            </div>
        </div>
    )
}

export default PopupSearch