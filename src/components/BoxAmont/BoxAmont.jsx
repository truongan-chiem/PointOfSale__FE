import React, { useEffect, useId } from "react";
import PropTypes from "prop-types";

import Box from "../Box/Box";
import Price from "../Price/Price";
import { BsArrowUp, BsArrowDown ,BsDashLg } from "react-icons/bs";

import "./BoxAmont.scss";

const BoxAmont = ({ title, percent1, percent2, amount, icon, colorIcon }) => {
  const iconId = useId();


  useEffect(() => {
    document.getElementById(iconId).style.backgroundColor = colorIcon;
  }, [colorIcon, iconId]);

  const renderPercent = (_percent) => {
    if(_percent){
      _percent = Number.parseFloat(_percent).toFixed(2)
      if (_percent < 0) {
        return (
          <h5 className="box-amount__header__percent__item" style={{color : "#EC4235"}}>
            <BsArrowDown />
            {_percent * -1} %
          </h5>
        );
      } 
      else if (_percent > 0) {
        return (
          <h5 className="box-amount__header__percent__item"  style={{color : "#58C893"}}>
            <BsArrowUp />
            {_percent} %
          </h5>
        );
      } 
      else {
        return (
          <h5 className="box-amount__header__percent__item" style={{color : 'gray' , fontSize : "1.4rem"}}>
            <BsDashLg />
          </h5>
        );
      }
    }
  };
  return (
    <Box className={"box-amount"}>
      <header className="box-amount__header">
        <h3 className="box-amount__header__title">{title}</h3>
        <div className="box-amount__header__percent">
          {renderPercent(percent1)}
          {title === "Cash/Banking" && (
            <div style={{ margin: "0 0.3rem ", fontSize: "1.5rem", fontWeight: "700" }}>/</div>
          )}
          {renderPercent(percent2)}
        </div>
      </header>
      <div className="box-amount__body">
        <div id={iconId} className="box-amount__body__icon">
          {icon}
        </div>
        {title === "Cash/Banking" ? (
          <div className="box-amount__body__cash-banking">
            <div>
              <span>Cash </span>
              :&nbsp;
              <Price price={Number(amount.split("/")[0])} color="black" />
            </div>
            <div>
              <span>Banking </span>
              :&nbsp;
              <Price price={Number(amount.split("/")[1])} color="black" />
            </div>
          </div>
        ) : title === "revenue" ? (
          <Price price={Number(amount)} color="black" className="box-amount__body__amount" />
        ) : (
          <h1 className="box-amount__body__amount">
            {amount} {title === "products sold" ? "Products" : "Bills"}{" "}
          </h1>
        )}
      </div>
    </Box>
  );
};

BoxAmont.propsType = {
  title: PropTypes.string.isRequired,
  percent1: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  colorIcon: PropTypes.string.isRequired,
};

export default BoxAmont;
