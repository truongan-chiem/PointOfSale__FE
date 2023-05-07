import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiBarChartAlt2 } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { TbSmartHome } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";

import Button from "../Button/Button";

import "./Sidebar.scss";
import { useSelector } from "react-redux";
const listNav = [
  {
    display: "Home",
    link: "/",
    icon: <TbSmartHome />,
  },
  {
    display: "Statistic",
    link: "/statistic",
    icon: <BiBarChartAlt2 />,
  },
  {
    display: "History",
    link: "/history",
    icon: <AiOutlineHistory />,
  },
  {
    display: "Manage",
    link: "/manage",
    icon: <FiSettings />,
  },
];
const Sidebar = () => {
  const location = useLocation();
  const user = useSelector(state => state.user.information)
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link to="/">
          <h1 className="sidebar__top__logo">K</h1>
        </Link>
        <nav className="sidebar__top__nav">
          {listNav.map((item, index) => {
            if(user?.role === 0 && item.display ==="Manage") return null
            return (
              <Link to={item.link} key={index}>
                <Button
                  type={"shortcut"}
                  icon={item.icon}
                  className={item.link === location.pathname ? "activeNav" : ""}
                >
                  {item.display}
                </Button>
              </Link>
            )
          } 
             
          )}
        </nav>
      </div>
      <Link to={"/profile"}>
        <Button
          type={"shortcut"}
          className={`sidebar__profile ${location.pathname === "/profile" ? "activeNav" : ""}`}
          icon={
            <img
              src={user?.image.url}
              alt=""
            />
          }
        >
          profile
        </Button>
      </Link>
    </div>
  );
};

export default Sidebar;
