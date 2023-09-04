import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { FiMoreHorizontal } from "react-icons/fi";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { TbDatabaseOff } from "react-icons/tb";
import moment from "moment";

import Box from "../../components/Box/Box";
import Header from "../../components/Header/Header";
import Popup from "../../components/Popup/Popup";
import ModalDelete from "../../components/ModalDelete/ModalDelete";
import DateRange from "../../components/DateRange/DateRange";
import { useDispatch } from "react-redux";
import { getHistory } from "../../redux/Slice/historySlice";

import "./History.scss";
import Price from "../../components/Price/Price";
import { useEffect } from "react";
import ModalDetailOrder from "../../components/ModalDetailOrder/ModalDetailOrder";
import useWindowSize from "../../hook/useWindowSize";
import Pagination from "../../components/Pagination/Pagination";
const History = () => {
  const listData = useSelector((state) => state.history.listData);
  const isLoading = useSelector((state) => state.history.isLoading);
  const totalItem = useSelector((state) => state.history.totalItem);
  const profit = useSelector((state) => state.history.profit);
  const ProductSold = useSelector((state) => state.history.ProductSold);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [date, setDate] = useState({
    start: null,
    end: null,
  });
  const [sortBy, setSortBy] = useState("created_at");
  const [sortType, setSortType] = useState("decs");

  const currentPage = useRef(1);
  const getData = useCallback(
    (page) => {
      dispatch(getHistory({ ...date, page, sortType, sortBy }));
    },
    [date, dispatch, sortBy, sortType]
  );

  useEffect(() => {
    currentPage.current = 1;
    if (date.start !== null && date.end !== null) {
      getData(currentPage.current);
    }
  }, [date, dispatch, getData]);
  const totalPage = Math.ceil(totalItem / 10);

  const handleSort = (_sortBy) => {
    if (sortBy !== _sortBy) {
      setSortBy(_sortBy);
      setSortType("decs");
    } else {
      setSortType((prev) => (prev === "decs" ? "acs" : "decs"));
    }
  };

  return (
    <div className="history container">
      <Header title={"History Order"} />
      <Box className={"history__box"}>
        <div className="history__header">
          <div className="history__header__report">
            <div className="history__header__report-item">
              <h3>Total Orders : </h3>
              <span>{totalItem}</span>
            </div>
            <div className="history__header__report-item">
              <h3>Profit : </h3>
              <Price price={profit} color={"black"} />
            </div>
            <div className="history__header__report-item">
              <h3>Products Sold : </h3>
              <span>{ProductSold}</span>
            </div>
          </div>
          <div className="history__header__date">
            <button
              onClick={() => {
                const today = new Date();
                const firstDayLastWeek = new Date(
                  today.setDate(today.getDate() - today.getDay() - 6)
                );
                const lastDayLastWeek = new Date(
                  today.setDate(today.getDate() - today.getDay() + 7)
                );
                setDate({ start: firstDayLastWeek, end: lastDayLastWeek });
              }}
            >
              last week
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
                const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));
                setDate({ start: firstDay, end: lastDay });
              }}
            >
              this week
            </button>
            <button
              onClick={() => {
                const today = new Date();
                today.setDate(today.getDate() - 1);
                setDate({ start: today, end: today });
              }}
            >
              Yesterday
            </button>
            <DateRange setDate={setDate} history={true} />
          </div>
        </div>

        <div className="history__body">
          <div className="table">
            <div className="table__header">
              <div className="table__header__fullName">Full name</div>
              <div className="pointer" onClick={() => handleSort("created_at")}>
                <p>Date</p>
                {sortBy === "created_at" && sortType === "decs" ? (
                  <FaSortAmountDown />
                ) : sortBy === "created_at" && sortType === "acs" ? (
                  <FaSortAmountUpAlt />
                ) : (
                  <></>
                )}
              </div>
              {width >= 768 && (
                <div className="pointer" onClick={() => handleSort("count")}>
                  <p>Count</p>
                  {sortBy === "count" && sortType === "decs" ? (
                    <FaSortAmountDown />
                  ) : sortBy === "count" && sortType === "acs" ? (
                    <FaSortAmountUpAlt />
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {width >= 768 && (
                <div className="pointer" onClick={() => handleSort("totalPrice")}>
                  <p>Amount</p>
                  {sortBy === "totalPrice" && sortType === "decs" ? (
                    <FaSortAmountDown />
                  ) : sortBy === "totalPrice" && sortType === "acs" ? (
                    <FaSortAmountUpAlt />
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {width >= 768 && (
                <div className="pointer" onClick={() => handleSort("optionPayment")}>
                  <p>Payment</p>
                  {sortBy === "optionPayment" && sortType === "decs" ? (
                    <FaSortAmountDown />
                  ) : sortBy === "optionPayment" && sortType === "acs" ? (
                    <FaSortAmountUpAlt />
                  ) : (
                    <></>
                  )}
                </div>
              )}
              <div>Action</div>
            </div>
            <div className="table__body">
              {isLoading ? (
                <div className="history__body__loading">
                  <VscLoading />
                </div>
              ) : listData.length > 0 ? (
                listData.map((item, index) => {
                  const date = moment(item.created_at).format("DD/MM/YYYY");
                  return (
                    <div className="table__body__row" key={index}>
                      <div className="table__body__row-item">
                        {item.owenId.lastName}&nbsp;{item.owenId.firstName}
                      </div>
                      <div className="table__body__row-item">{date}</div>
                      {width >= 768 && (
                        <>
                          <div className="table__body__row-item">{item.count}</div>
                          <div className="table__body__row-item">
                            <Price
                              price={item.totalPrice}
                              color={"black"}
                              className="history__price"
                            />
                          </div>
                          <div
                            className="table__body__row-item"
                            style={{ display: "flex", justifyContent: "center" }}
                          >
                            <div
                              className={`history__body__payment ${
                                item.optionPayment === 0 ? "cash" : "ewallet"
                              }`}
                            >
                              {item.optionPayment === 0 ? "Cash" : "E-Wallet"}
                            </div>
                          </div>
                        </>
                      )}
                      <div className="table__body__row-item">
                        <Action name={`Order ${item._id}`} id={item._id} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div id="no-result-history">
                  <TbDatabaseOff />
                  <p>No results found</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Pagination currentPage={currentPage} getData={getData} totalPage={totalPage} />
      </Box>
    </div>
  );
};

const Action = ({ name, id }) => {
  const [action, setAction] = useState();
  const [isDelect, setIsDelect] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const userInformation = useSelector((state) => state.user.information);

  const popupRef = useRef(null);
  return (
    <div style={{ position: "relative" }} className="iconMore" ref={popupRef}>
      <FiMoreHorizontal onClick={() => setAction((prev) => !prev)} />
      {action && (
        <Popup setOpen={setAction} popupRef={popupRef}>
          <button
            className="history__btn view"
            onClick={() => {
              setOpenDetail(true);
              setAction(false);
            }}
          >
            Detail
          </button>
          {userInformation?.role === 2 && (
            <button className="history__btn del" onClick={() => setIsDelect(true)}>
              Delete
            </button>
          )}
        </Popup>
      )}
      {isDelect && <ModalDelete setIsToggleDelete={setIsDelect} type="order" name={name} id={id} />}
      {openDetail && <ModalDetailOrder setOpenDetail={setOpenDetail} id={id} />}
    </div>
  );
};

export default History;
