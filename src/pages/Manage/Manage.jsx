import React, { useEffect, useState } from "react";
import ItemSubSidebar from "../../components/ItemSubSidebar/ItemSubSidebar";
import SubSidebar from "../../components/SubSidebar/SubSidebar";

import {MdSwitchAccount } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {GiCardboardBox} from 'react-icons/gi'

import "./Manage.scss";
import TabSubSideBar from "../../components/TabSubSideBar/TabSubSideBar";
import { listTabs } from "../../asset/data/listMenu";
import Button from "../../components/Button/Button";
import CardItemSetting from "../../components/CardItemSetting/CardItemSetting";
import { useDispatch, useSelector } from "react-redux";
import CardAddItemSetting from "../../components/CardItemSetting/CardAddItemSetting";
import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import { toggleModalForm } from "../../redux/Slice/modalSlice";
import TableAccount from "../../components/TableAccount/TableAccount";

const Manage = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const listItem = [
    {
      title: "Products",
      icon: <GiCardboardBox />,
    },
    {
      title: "Accounts",
      icon: <MdSwitchAccount />,
    }
  ];
  const listData = useSelector((state) => state.products.product.listProduct);
  const isToggle = useSelector((state) => state.modal.isToggleForm);
  const dispatch = useDispatch();
  const [listMenu, setListMenu] = useState([listData]);

  useEffect(() => {
    if (activeTab === "all") {
      setListMenu(listData);
    } else {
      setListMenu(listData.filter((item) => item.type === activeTab));
    }
  }, [activeTab, listData]);
  return (
    <div className="setting container">
      <SubSidebar>
        {listItem.map((item, index) => (
          <ItemSubSidebar
            key={`item-sidebar-${index}`}
            title={item.title}
            icon={item.icon}
            onClick={() => setActiveItem(index)}
            className={index === activeItem ? "active" : ""}
          />
        ))}
      </SubSidebar>

      <TabSubSideBar>
        {activeItem === 0 && (
          <div className="setting__content">
            <div className="setting__content__header">
              {listTabs.map((item, index) => (
                <Button
                  key={`button-${index}`}
                  type={"shortcut"}
                  icon={item.icon}
                  className={activeTab === item.type ? "active" : ""}
                  onClick={() => setActiveTab(item.type)}
                >
                  {item.display}
                </Button>
              ))}
            </div>

            <div className="setting__content__list-dishes">
              <CardAddItemSetting />
              {listMenu.map((item, index) => (
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
          </div>
        )}

        {activeItem ===1 &&(
          <TableAccount />
        )}
      </TabSubSideBar>
    </div>
  );
};

export default Manage;
