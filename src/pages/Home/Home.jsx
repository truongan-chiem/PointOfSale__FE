import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Bill from "../../components/Bill/Bill";

import "./Home.scss";
import Button from "../../components/Button/Button";
import TabContent from "../../components/TabContent/TabContent";
import Header from "../../components/Header/Header";
import { listTabs } from "../../asset/data/listMenu";
import useWindowSize from "../../hook/useWindowSize";


const Home = () => {

  const order = useSelector((state) => state.products.bill.orders);

  const [tabValue, setTabValue] = useState("all");

  const [openBill, setOpenBill] = useState(true);

  const isToggle = useSelector((state) => state.toggleBill.isToggle);

  const { width } = useWindowSize();
  useEffect(() => {
    if (width > 1024) {
      setOpenBill(true);
    } else {
      setOpenBill(false);
    }
  }, [width]);

  useEffect(() => {
    if (isToggle) {
      setOpenBill(true);
    } else {
      setOpenBill(false);
    }
  }, [isToggle]);


  const ref = useRef();

  useEffect(() => {
    const handleOutSide = (e) => {
      if (width <= 1024 && ref.current && !ref.current.contains(e.target)) {
        setOpenBill(false);
      }
    };
    document.addEventListener("click", handleOutSide);

    return () => {
      document.removeEventListener("click", handleOutSide);
    };
  }, [width]);


  return (
    <div className="home">
      <div className="home__main">
        <Header title={"choose category"} type="search" />

        <nav className="home__main__tabs">
          {listTabs.map((item, index) => (
            <Button
              onClick={() => setTabValue(item.type)}
              key={index}
              icon={item.icon}
              type={"shortcut"}
              className={item.type === tabValue ? "active-listType" : ""}
            >
              {item.display}
            </Button>
          ))}
        </nav>

      
        <TabContent tabValue={tabValue} setTabValue = {setTabValue}/>
         
      </div>
      {openBill && (
        <div className={`home__bill ${width <= 1024 ? "fixedBill" : ""}`}>
          <Bill order={order} type="home" ref={ref} />
        </div>
      )}
    </div>
  );
};

export default Home;
