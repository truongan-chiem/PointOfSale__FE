import React from "react";
import Box from "../Box/Box";
import ModalTrending from "../ModalTrending/ModalTrending";

import { BsArrowRightShort ,BsDatabaseFillSlash } from "react-icons/bs";

import "./BoxOrderTrending.scss";
import { useState } from "react";

const BoxOrderTrending = ({ title, data }) => {
  const date = new Date();

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [toggleModal, setToggleModal] = useState(false);
  const [target, setTarget] = useState();
  const renderContent = (item) => {
    if (item.order) {
      return (
        <p>
          order:<span>{item.order}</span>
        </p>
      );
    } else if (item.quantity) {
      return (
        <p>
          Quantity:<span>{item.quantity === `0` ? "Sold Out" : item.quantity}</span>
        </p>
      );
    }
  };

  return (
    <>
      <Box className="box-order-trending">
        <div className="box-order-trending__header">
          <h1>{title}</h1>
          <button
            onClick={() => {
              setToggleModal(true);
              setTarget(title);
            }}
            disabled = {data.length <= 0}
          >
            <span>View all</span> <BsArrowRightShort />
          </button>
        </div>
        <p className="box-order-trending__time">{title ==="trending product" ? `Month: ${month}/${year}` : "Inventory"}</p>
        <h3 className="box-order-trending__subtitle">Products</h3>
        {data.length > 0 ? (
          <div className="box-order-trending__listItem">
            {data.map((item, index) => (
              <div key={`item-${index}`} className="box-order-trending__listItem__item">
                <img src={item.img} alt="" />
                <div className="box-order-trending__listItem__item__info">
                  <h4>{item.name}</h4>
                  {renderContent(item)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "2rem", color: "#704332", display : 'flex' , alignItems : 'center',justifyContent :"center" }}>
            <h2 style={{marginRight : '1rem'}}>No Data</h2>
            <BsDatabaseFillSlash />
          </div>
        )}
      </Box>
      {toggleModal && <ModalTrending setToggleModal={setToggleModal} target={target} />}
    </>
  );
};

export default BoxOrderTrending;
