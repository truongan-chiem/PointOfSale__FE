import React from 'react'
import Box from '../Box/Box'

import './TabSubSideBar.scss'

const TabSubSideBar = ({children,className}) => {
  return (
    <Box className={`tab-sub-sidebar ${className}`}>{children}</Box>
  )
}

export default TabSubSideBar