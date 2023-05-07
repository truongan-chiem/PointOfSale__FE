import React from "react";

const Accessory = () => {
  return (
    <svg
      fill="#000000"
      width="3rem"
      height="3rem"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="secondary"
        d="M14.19,19.15h0a3,3,0,0,0,0-4.24l-2.82-2.83a1,1,0,0,0-1.42,0L7.12,14.91a1,1,0,0,0,0,1.41L10,19.15A3,3,0,0,0,14.19,19.15Z"
        style={{ fill: "rgb(44, 169, 188)", strokeWidth: "2" }}
      ></path>
      <path
        id="primary"
        d="M14.2,19.15,15,20A3.49,3.49,0,0,0,20,20h0a3.49,3.49,0,0,0,0-5L11.36,6.41a2,2,0,0,1,0-2.83h0a2,2,0,0,1,2.83,0L18,7.39"
        style={{
          fill: "none",
          stroke: "rgb(0, 0, 0)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></path>
      <path
        id="primary-2"
        data-name="primary"
        d="M3.59,8.54h0a2,2,0,0,1,2.82,0L10,12.08,8.54,13.49,7.12,14.91,3.59,11.37A2,2,0,0,1,3.59,8.54Zm10.6,10.61h0a3,3,0,0,0,0-4.24l-2.82-2.83a1,1,0,0,0-1.42,0L7.12,14.91a1,1,0,0,0,0,1.41L10,19.15A3,3,0,0,0,14.19,19.15Z"
        style={{
          fill: "none",
          stroke: "rgb(0, 0, 0)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
        }}
      ></path>
    </svg>
  );
};

export default Accessory;
