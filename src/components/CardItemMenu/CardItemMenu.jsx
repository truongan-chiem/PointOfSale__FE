import React from "react";
import { useDispatch } from "react-redux";

import Button from "../Button/Button";
import Price from "../Price/Price";
import {addItemToBill} from '../../redux/Slice/productSlice'
import soldOut from '../../asset/soldout.png'

import "./CardItemMenu.scss";

const CardItemMenu = ({_id, name, desc, image, price , quantity ,tabIndex }) => {

  const dispatch = useDispatch();

  //handler add order
  const handleAddOrder = () =>{
    dispatch(addItemToBill({_id}))
  }

  return (
    <div className="card-item-menu"  tabIndex={tabIndex}>
      <div className="card-item-menu__info">
        {quantity <= 0 && <img src={soldOut} alt='' className="card-item-menu__info__soldout"/>}
        <img className="card-item-menu__info__image" src={image?.url} alt="" style={quantity <= 0 ? {filter: "grayscale(100%)"} : {}} />
        <div className="card-item-menu__info__about">
          <h2>{name}</h2>
          <span>{desc}</span>
          <Price price={price} color="primary" />
        </div>
      </div>
      <div className="card-item-menu__btn">
        <Button onClick={handleAddOrder} style = {quantity <= 0 ? {background: "gray"} : {}} disabled = {quantity <= 0}>Add to Bill</Button>
      </div>
    </div>
  );
};

export default CardItemMenu;
