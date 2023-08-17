import React, { useState } from "react";
import ItemSubSidebar from "../../components/ItemSubSidebar/ItemSubSidebar";
import SubSidebar from "../../components/SubSidebar/SubSidebar";

import {MdSwitchAccount } from "react-icons/md";
import {GiCardboardBox} from 'react-icons/gi'

import "./Manage.scss";
import TabSubSideBar from "../../components/TabSubSideBar/TabSubSideBar";

import TableAccount from "../../components/TableAccount/TableAccount";
import TabProductSetting from "../../components/TabProductSetting/TabProductSetting";

const Manage = () => {
  const [activeItem, setActiveItem] = useState(0);
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
          <TabProductSetting />
        )}

        {activeItem ===1 &&(
          <TableAccount />
        )}
      </TabSubSideBar>
    </div>
  );
};

export default Manage;
