import React, { useState } from "react";

import { AiOutlineRise } from "react-icons/ai";
import { HiNewspaper } from "react-icons/hi";
import { BsFillCartFill } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";

import BoxAmont from "../../components/BoxAmont/BoxAmont";
import Header from "../../components/Header/Header";
import DateRange from "../../components/DateRange/DateRange";
import "./Statistic.scss";
import BoxAreaChart from "../../components/BoxAreaChart/BoxAreaChart";
import BoxOrderTrending from "../../components/BoxOrderTrending/BoxOrderTrending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOutOfStock, getStatistic, getTrendingProduct } from "../../redux/Slice/statisticSlice";

const Statistic = () => {
  const dispatch = useDispatch();

  const {
    banking,
    cash,
    revenue,
    totalBills,
    dataChart,
    productSold,
    dataTrending,
    dataOutOfStock,
  } = useSelector((state) => state.statistic);

  const listBoxAmount = [
    {
      title: "revenue",
      amount: `${revenue.value}`,
      percent1: `${revenue.percent}`,
      icon: <AiOutlineRise />,
      colorIcon: "#EF9235",
    },
    {
      title: "products sold",
      amount: `${productSold.value}`,
      percent1: `${productSold.percent}`,
      icon: <BsFillCartFill />,
      colorIcon: "#58C893",
    },
    {
      title: "Total Bills",
      amount: `${totalBills.value}`,
      percent1: `${totalBills.percent}`,
      icon: <HiNewspaper />,
      colorIcon: "#EC4235",
    },
    {
      title: "Cash/Banking",
      amount: `${cash.value}/${banking.value}`,
      percent1: `${cash.percent}`,
      percent2: `${banking.percent}`,
      icon: <FaMoneyBillWave />,
      colorIcon: "#FFC147",
    },
  ];

  const [listOrderTreding, setListOrderTreding] = useState([]);
  const [listOutOfStock, setListOutOfStock] = useState([]);
  useEffect(() => {
    setListOrderTreding([]);

    dataTrending.slice(0, 4).forEach((e) => {
      setListOrderTreding((prev) => [
        ...prev,
        {
          img: e.productId.image.url,
          name: e.productId.name,
          order: `${e.number}`,
        },
      ]);
    });

    setListOutOfStock([]);
    dataOutOfStock.slice(0, 4).forEach((e) => {
      setListOutOfStock((prev) => [
        ...prev,
        {
          img: e.image.url,
          name: e.name,
          quantity: `${e.quantity}`,
        },
      ]);
    });
  }, [dataTrending, dataOutOfStock]);

  const [date, setDate] = useState({
    start: null,
    end: null,
  });

  useEffect(() => {
    dispatch(getTrendingProduct());
    dispatch(getOutOfStock());
  }, [dispatch]);

  useEffect(() => {
    if (date.start !== null && date.end !== null) {
      dispatch(getStatistic(date));
    }
  }, [date, dispatch]);

  return (
    <div className="statistic container">
      <div className="statistic__header">
        <Header title={"Statistic"} type="only-title" />
        <DateRange setDate={setDate} />
      </div>
      <div className="statistic__content">
        {listBoxAmount.map((item, index) => (
          <BoxAmont
            key={`boxAmount-${index}`}
            title={item.title}
            amount={item.amount}
            percent1={item.percent1}
            percent2={item?.percent2}
            icon={item.icon}
            colorIcon={item.colorIcon}
          />
        ))}

        <BoxAreaChart dataChart={dataChart} />

        <BoxOrderTrending title={"trending product"} data={listOrderTreding} />
        <BoxOrderTrending title={"out of stock"} data={listOutOfStock} />
      </div>
    </div>
  );
};

export default Statistic;
