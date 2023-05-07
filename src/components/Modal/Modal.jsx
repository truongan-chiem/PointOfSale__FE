import React, { useRef } from "react";
import { useEffect } from "react";
import "./Modal.scss";
const Modal = ({ children, className ,onClose }) => {
  const overlayref = useRef()
  const modalref = useRef()
  
  useEffect(() => {
    const handleClickOutside = (event) =>{
      if(!modalref.current.contains(event.target) && overlayref.current.contains(event.target)){
        onClose()
      }
    }

    document.addEventListener('click',handleClickOutside)
    return () =>{
      document.removeEventListener('click',handleClickOutside)
    }
  }, [onClose])
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () =>{
      document.body.style.overflow = 'overlay';
    }
  }, [])
  

  return (
    <div className="overlay" ref={overlayref}>
      <div className={`modal ${className}`} ref= {modalref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
