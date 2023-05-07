import React from 'react'
import PropTypes from 'prop-types';

import './Button.scss'
const Button = (props) => {
    const {type,children,className,icon ,onClick = () => {}} = props;
  return (
    <>
        {type === 'shortcut' ? (
            <ButtonShortcut 
                children={children} 
                icon = {icon} 
                className={className}
                onClick = {onClick}
                />
        ):
        <button 
        {...props}
        onClick = {onClick}
        className={`btn ${className}`}
            >
            {children}
        </button>   
    }
    </>
  )
}
const ButtonShortcut = ({icon,children,onClick,className}) =>{
    return (
        <button className={`btn-shortcut ${className}`} onClick={onClick}>
            {icon}
            <p>{children}</p>
        </button>
    )
}

Button.propTypes  = {
    type : PropTypes.string,
    icon : PropTypes.node,
    children : PropTypes.node.isRequired,
    onClick : PropTypes.func,
    className : PropTypes.string
}

export default Button