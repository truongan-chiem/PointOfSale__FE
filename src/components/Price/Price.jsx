import React from 'react'
import './Price.scss'
const Price = ({price,color,className}) => {
  price = price?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});

  return (
    <div className={`price price-${color} ${className}`}>{price}</div>
  )
}

export default Price