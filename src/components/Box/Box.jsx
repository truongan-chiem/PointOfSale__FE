import React from 'react'
import './Box.scss'
const Box = ({children,className,onClick = () => {}}) => {
  return (
    <div className={`box ${className}`} onClick = {onClick}>{children}</div>
  )
}

export default Box