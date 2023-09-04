import React, { useCallback, useEffect, useRef } from "react";
import CardItemMenu from "../CardItemMenu/CardItemMenu";
import Loading from '../Loading/Loading'

import "./TabContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeTab, getAllProduct, getHotProduct } from "../../redux/Slice/productSlice";
import { VscLoading } from "react-icons/vsc";
import { BsDatabaseFillSlash } from "react-icons/bs";
import { useState } from "react";
import Button from "../Button/Button";

const TabContent = ({ tabValue, setTabValue }) => {
  const titleTab = tabValue + " menu";
  const isLoading = useSelector((state) => state.products.product.isLoading);
  const isLoadingAddItem = useSelector((state) => state.products.product.isLoadingAddItem);

  const listProduct = useSelector((state) => state.products.product.listProduct);
  const totalItem = useSelector((state) => state.products.product.totalItem);
  const haveData = useSelector((state) => state.products.product.haveData);
  const dispatch = useDispatch();
  const currentPage = useRef(1);
  const bodyRef = useRef();
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("acs");

  const getData = useCallback(
    (_page) => {
      if (sortBy !== "hot") {
        dispatch(getAllProduct({ page: _page, limit: 10, type: tabValue, sortBy, sortType }));
      }
    },
    [dispatch, tabValue, sortBy, sortType]
  );

  useEffect(() => {
    currentPage.current = 1;
    getData(currentPage.current);
  }, [getData]);

  useEffect(() => {
    if (sortBy !== "hot") {
      dispatch(changeTab(true));
      bodyRef.current.scroll({
        top: 0,
      });
    }
  }, [tabValue, dispatch, sortBy, sortType]);

  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop < event.target.clientHeight + 30;
    if (bottom) {
      dispatch(changeTab(false));
      if (!isLoading) {
        if (haveData) {
          currentPage.current += 1;
          getData(currentPage.current);
        }
      }
    }
  };

  const handleChangeType = (_type) => {
    if (sortBy === _type) {
      setSortType((prev) => (prev === "acs" ? "decs" : "acs"));
    } else {
      setSortBy(_type);
      setSortType("acs");
    }
  };
  const handleGetHot = () => {
    setSortBy("hot");
    setTabValue("all");
    dispatch(getHotProduct());
    bodyRef.current.scroll({
      top: 0,
    });
  };

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <div className="tab-content__header__title">
          <h1>{titleTab}</h1>
          <Button
            className={sortBy === "name" ? "activeSort" : ""}
            onClick={() => handleChangeType("name")}
          >
            {sortBy === "name" && sortType === "decs" ? "Z - A" : "A - Z"}
          </Button>
          <Button
            className={sortBy === "created_at" ? "activeSort" : ""}
            onClick={() => handleChangeType("created_at")}
          >
            {sortBy === "created_at" && sortType === "decs" ? "Latest" : "Oldest"}
          </Button>
          <Button className={sortBy === "hot" ? "activeHot" : ""} onClick={handleGetHot}>
            Hot
          </Button>
        </div>
        <span>
          {totalItem} {titleTab.split(" ")[0]} Result
        </span>
      </div>

      <div className="tab-content__body" onScroll={handleScroll} ref={bodyRef}>
        <RenderTabBody sortBy={sortBy} listProduct = {listProduct} tabValue = {tabValue} />
      </div>
      {isLoading && (
        <div className="product__loading">
          <VscLoading />
        </div>
      )}
      {isLoadingAddItem && <Loading />}
    </div>
  );
};

export default TabContent;

const RenderTabBody = ({sortBy,tabValue,listProduct}) => {
  if (sortBy === "hot") {
    const arr =
      tabValue !== "all" ? listProduct.filter((item) => item.type === tabValue) : listProduct;

    if (arr.length > 0) {
      return arr.map((item, index) => (
        <CardItemMenu key={`'menu-'${item._id}`} {...item} tabIndex={index} />
      ));
    } else {
      return (
        <div className="tab-content__body__empty">
          <BsDatabaseFillSlash />
          <span>No data</span>
        </div>
      );
    }
  } else {
    if (listProduct.length > 0) {
      return listProduct.map((item, index) => (
        <CardItemMenu key={`'menu-'${item._id}`} {...item} tabIndex={index} />
      ));
    } else {
      return (
        <div className="tab-content__body__empty">
          <BsDatabaseFillSlash />
          <span>No data</span>
        </div>
      );
    }
  }
};