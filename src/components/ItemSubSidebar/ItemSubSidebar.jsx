import React from 'react'

import './ItemSubSidebar.scss'

const ItemSubSidebar = ({icon,title,className,onClick = () =>{}}) => {
  return (
    <div className={`item-sub-sidebar ${className}`} onClick={onClick}>
        {icon}
        <span>{title}</span>
    </div>
  )
}

export default ItemSubSidebar