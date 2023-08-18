import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { listTabs } from "../../asset/data/listMenu";
import CardItemSetting from "../../components/CardItemSetting/CardItemSetting";
import CardAddItemSetting from "../../components/CardItemSetting/CardAddItemSetting";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { toggleModalForm } from "../../redux/Slice/modalSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeTab, getAllProduct } from "../../redux/Slice/productSlice";
import { VscLoading } from "react-icons/vsc";

import './TabProductSetting.scss'

const TabProductSetting = () => {
  const [activeTab, setActiveTab] = useState("all");
  const isToggle = useSelector((state) => state.modal.isToggleForm);
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.products.product.listProduct);
  const isLoading = useSelector((state) => state.products.product.isLoading);
  const haveData = useSelector((state) => state.products.product.haveData);
  const currentPage = useRef(1);
  const bodyRef = useRef();

  const getData = useCallback(
    (_page) => {
      dispatch(getAllProduct({ page: _page, limit: 10, type: activeTab , sortBy : "created_at" , sortType : "decs" }));
    },
    [dispatch, activeTab]
  );

  useEffect(() => {
    currentPage.current = 1;
    getData(currentPage.current);
  }, [getData]);

  useEffect(() => {
    dispatch(changeTab(true));
    bodyRef.current.scroll({
      top: 0,
    });
  }, [activeTab, dispatch]);

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

  return (
    <div className="setting__content">
      <div className="setting__content__header">
        {listTabs.map((item, index) => (
          <Button
            key={`button-${index}`}
            type={"shortcut"}
            icon={item.icon}
            className={activeTab === item.type ? "active-listType" : ""}
            onClick={() => setActiveTab(item.type)}
          >
            {item.display}
          </Button>
        ))}
      </div>

      <div className="setting__content__list-dishes" onScroll={handleScroll} ref={bodyRef}>
        <CardAddItemSetting />
        {listProduct.map((item, index) => (
          <CardItemSetting key={`card-item-setting-${index}`} item={item} />
        ))}
      </div>
      {isToggle && (
        <Modal className={"modal__form"} onClose={() => dispatch(toggleModalForm())}>
          <AiOutlineCloseCircle
            className="modal__close"
            onClick={() => dispatch(toggleModalForm())}
          />
          <Form />
        </Modal>
      )}
       {isLoading && <div className="product__loading">
          <VscLoading />
      </div>}
    </div>
  );
};

export default TabProductSetting;
