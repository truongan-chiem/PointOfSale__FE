import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {BiMenu} from 'react-icons/bi'
import "./Layout.scss";
import { useState } from "react";
import useWindowSize from "../../hook/useWindowSize";
const Layout = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false)

  const {width}= useWindowSize();

  useEffect(() => {
    if(width >= 650){
      setOpenMenu(false)
    }
  }, [width])
  

  return (
    <div className="layout">
       {width < 650 && <div className="mobile-menu" onClick={() => setOpenMenu(true)}>
        <BiMenu />
      </div>}
     {openMenu && <div className="layout__overlay" onClick={() => setOpenMenu(false)}></div>}
      <div className="layout__left" style={openMenu ? {transform: 'translateX(0)'}:{}}>
        <Sidebar setOpenMenu={setOpenMenu}/>
      </div>
      <div className="layout__body">
      
          {children}
        
      </div>
    </div>
  );
};

export default Layout;
