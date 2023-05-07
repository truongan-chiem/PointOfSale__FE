import React from "react";
import { useDispatch } from "react-redux";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoTrashBin } from "react-icons/io5";
import Price from "../Price/Price";
import "./ItemOrderBill.scss";
import { minusNumber, plusNumber } from "../../redux/Slice/productSlice";
const ItemOrderBill = ({ _id, name, number, price, image,quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="item-order-bill">
      <div className="item-order-bill__info">
        <img src={image.url} alt="" />
        <div className="item-order-bill__info__about">
          <h2>{name}</h2>
          <div className="item-order-bill__info__about__action">
            <div className="item-order-bill__info__about__action__amount">
             
              <button onClick={() => dispatch(minusNumber(_id))}>
                {number === 1 ? <IoTrashBin style={{ color: "#EC4235" }} /> : <FiMinus />}
              </button>
              <h2>{number}</h2>
              <button 
              onClick={() => dispatch(plusNumber(_id))} 
              className = {`${number >= quantity ? "disable" : ''}`} 
              disabled = {number >= quantity}>
                <FiPlus/>
              </button>
                
             
            </div>

          </div>
        </div>
      </div>
      <Price price={price} color="gray" className={"item-order-bill__price"}/>
    </div>
  );
};

export default ItemOrderBill;
