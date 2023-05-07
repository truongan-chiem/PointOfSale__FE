import React, { forwardRef, useId, useState } from "react";
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import "./Input.scss";
const Input = ({placeholder,className,icon,isSeach = false,left ,type = 'text' ,...passProps},ref) => {
  const idInput = useId()
  const [seePw, setSeePw] = useState(type);
  return (
    <div style={{paddingLeft : left}} className={`input ${className}`}>
      <div className="input__text">
        <input ref={ref} required id={idInput} type={seePw} {...passProps}/>
        <label className={isSeach === 'search' ? 'label__search' : 'label__normal'} htmlFor={idInput}>{placeholder}</label>
      </div>
      {icon && icon}
      {type === 'password' && (
        seePw === 'text' ? 
        <AiFillEyeInvisible onClick={() => setSeePw('password')} className="input__seepw" />
        :
        <AiFillEye onClick={() => setSeePw('text')} className="input__seepw" />
      )}
    </div>
  );
};

export default forwardRef(Input);
