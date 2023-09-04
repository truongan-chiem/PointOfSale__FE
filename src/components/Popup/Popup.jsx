import React, { useEffect } from 'react'
import './Popup.scss'
const Popup = ({children,setOpen,popupRef,className}) => {

  useEffect(() => {
    const handleClickOutSide = (e) =>{
     
        if(!popupRef.current.contains(e.target)){
          setOpen(false)
        
      }
    } 
    document.addEventListener('click', handleClickOutSide)
    
    return () =>{
      document.removeEventListener('click', handleClickOutSide)
    }
  }, [setOpen,popupRef])
  

  return (
    <div className={`popup ${className}`}>
        {children}
    </div>
  )
}

export default Popup