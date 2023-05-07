import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { FiMoreHorizontal } from "react-icons/fi";
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
const History = () => {
  const listData = useSelector((state) => state.history.listData);
  const isLoading = useSelector((state) => state.history.isLoading);
  const dispatch = useDispatch();
  const {width} = useWindowSize()
  const [date, setDate] = useState({
    start: null,
    end: null,
  });
  useEffect(() => {
    if (date.start !== null && date.end !== null) {
      dispatch(getHistory(date));
    }
  }, [date, dispatch]);

  return (
    <div className="history container">
      <Header title={"History Order"} />
      <Box className={"history__box"}>
        <div className="history__header">
          <h1>Select Date</h1>
          <DateRange setDate={setDate} />
        </div>

        <div className="history__body">
          {isLoading ? (
            <div className="history__body__loading">is Loading ...</div>
          ) : (
            <table width={'100%'}>
                <tr>
                  {width >= 768 && <th>Order ID</th>}
                  <th>Staff</th>
                  <th>Date</th>
                  {width >= 768 && <th>Amount</th>}
                  {width >= 768 && <th>Payment</th>}
                  <th>Action</th>
                </tr>
                {listData.length > 0 ? (
                  listData.map((item, index) => {
                    const totalAmount = item.orders.reduce(
                      (total, item2) => total + item2.productId?.price * item2.number,
                      0
                    );
                    const date = moment(item.created_at).format("DD/MM/YYYY");
                    return (
                      <tr key={index}>
                        {width >= 768 && <td>#{item._id}</td>}
                        
                        <td>
                          {item.owenId.lastName}&nbsp;{item.owenId.firstName}
                        </td>
                        <td>{date}</td>
                        {width >= 768 && 
                       <>
                        <td>
                          <Price price={Number(totalAmount) + totalAmount * 0.1} className="history__price" />
                        </td>
                        <td>
                          <div className="history__body__payment">
                            {item.optionPayment === 0
                              ? "Cash"
                              : item.optionPayment === 1
                              ? "Debit"
                              : "E-Wallet"}
                          </div>
                        </td>
                        </>
                        }
                        <td>
                          <Action name={`Order ${item._id}`} id={item._id} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} id="no-result-history">
                      <TbDatabaseOff />
                      <p>No results found</p>
                    </td>
                  </tr>
                )}
            </table>
          )}
        </div>
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
         { userInformation?.role === 2 && <button className="history__btn del" onClick={() => setIsDelect(true)}>
            Delete
          </button> }
        </Popup>
      )}
      {isDelect && <ModalDelete setIsToggleDelete={setIsDelect} type="order" name={name} id={id} />}
      {openDetail && <ModalDetailOrder setOpenDetail={setOpenDetail} id={id} />}
    </div>
  );
};

export default History;
