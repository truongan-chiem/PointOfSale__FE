import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss";
const Layout = ({ children }) => {

  return (
    <div className="layout">
      <div className="layout__left">
        <Sidebar />
      </div>
      <div className="layout__body">
      
          {children}
        
      </div>
    </div>
  );
};

export default Layout;
