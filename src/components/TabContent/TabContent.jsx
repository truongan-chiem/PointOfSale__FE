import React, { useCallback, useEffect, useRef } from "react";
import CardItemMenu from "../CardItemMenu/CardItemMenu";
import './TabContent.scss'
import { useDispatch, useSelector } from "react-redux";
import { changeTab, getAllProduct } from "../../redux/Slice/productSlice";
import { VscLoading } from "react-icons/vsc";
import { BsDatabaseFillSlash } from "react-icons/bs";

const TabContent = ({tabValue}) => {
  const titleTab = tabValue + " menu";
  // const numberResult = listData.length;
  // const titleTab = "All menu";
  const isLoading = useSelector((state) => state.products.product.isLoading);

  const listProduct = useSelector((state) => state.products.product.listProduct);
  const numberResult = listProduct.length;
  const haveData = useSelector((state) => state.products.product.haveData);
  const dispatch = useDispatch();
  const currentPage = useRef(1);
  const bodyRef = useRef()
  

  const getData = useCallback((_page) =>{
    dispatch(getAllProduct({ page: _page , limit: 10 , type : tabValue }))
  },[dispatch,tabValue])

  useEffect(() => {
    currentPage.current = 1;
    getData(currentPage.current)
  }, [getData])
  
  useEffect(() => {
      dispatch(changeTab(true))
      bodyRef.current.scroll({
        top : 0
      })
  }, [tabValue,dispatch])
  

  const handleScroll = event => {
    const bottom = event.target.scrollHeight - event.target.scrollTop < event.target.clientHeight + 30
    if(bottom){
      dispatch(changeTab(false))
      if(!isLoading){
        if(haveData){
          currentPage.current += 1;
          getData(currentPage.current)
        }
      }
    }
  };

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <h1>{titleTab}</h1>
        <span>{numberResult} {titleTab.split(' ')[0]} Result</span>
      </div>

      <div className="tab-content__body" onScroll={handleScroll} ref={bodyRef}>
        {listProduct.length > 0 ? listProduct.map((item,index) =>(
          <CardItemMenu key={`'menu-'${item._id}`} {...item} tabIndex={index} />
        )) : <div className="tab-content__body__empty">
            <BsDatabaseFillSlash />
            <span>No data</span>
          </div>}
      </div>
      {isLoading && <div className="product__loading">
          <VscLoading />
      </div>}
    </div>
  );
};

export default TabContent;
