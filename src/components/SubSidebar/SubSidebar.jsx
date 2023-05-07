import React from 'react'
import Box from '../Box/Box'
import './SubSidebar.scss'
const SubSidebar = ({children,className}) => {
  return (
    <Box className={`sub-sidebar ${className}`}>
        {children}
    </Box>
  )
}

export default SubSidebar