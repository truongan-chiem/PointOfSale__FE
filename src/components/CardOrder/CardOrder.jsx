import React, { useState } from "react";
import Box from "../Box/Box";
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import "./CardOrder.scss";

const CardOrder = ({ id, number, total,className ,onClick }) => {
  const [finish, setFinish] = useState(false);
  let timeFinish = number * 60;
    return (
    <Box className={`card-order ${className}`} onClick = {onClick}>
      <div className="card-order__header">
        <h1>Orders : #{id}</h1>
        <div className="countdown">
          <CountdownCircleTimer
            isPlaying = {!finish} 
            size={80}
            key = {1}
            strokeWidth = {8}
            trailColor = {finish ? '#54CA93' : '#EFEFEF'}
            duration={timeFinish}
            colors={["#E1014F", "#F16509", "#FABA00", "#54CA93"]}
            colorsTime={[10, 7, 3, 0]}
            onComplete={() => {
              setFinish(true)
            }}
          >
            {({remainingTime}) => renderTime({remainingTime,finish}) 
              }
          </CountdownCircleTimer>
      </div>
      </div>
      <div className="card-order__body">
        <h4>qta : {number}</h4>
        <div className="card-order__body__info">
          <div>dine-in</div>
          <h1>${total}</h1>
        </div>
      </div>
    </Box>
  );
};

const renderTime = ({remainingTime,finish}) => {
  let minute = Math.floor(remainingTime/60) < 10 ? `0${Math.floor(remainingTime/60)}` : Math.floor(remainingTime/60);
  let second = remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60;
  
  if (finish) {
    return <div className="timer done">Done!!!</div>;
  }
  return (
    <div className={`timer ${second < 2 ? 'hide':''}`}>
      <span>{minute} : {second}</span>
    </div>
  );
};

export default CardOrder;
