import React from 'react'

import './CardStaff.scss'
const CardStaff = ({user}) => {

  return (
    <div className='card-staff'>
        <div className='card-staff__info'>
          <img src={user?.image.url} alt="" />
          <div className="card-staff__info__about">
            <h3 >I'm a {user?.role === 0 ? 'Staff' : user?.role === 1 ? 'manager' : 'admin'}</h3>
            <h2 >{user?.lastName}&nbsp;{user?.firstName}</h2>
          </div>
        </div>
        <div className="card-staff__noti">
          <p>K</p>
        </div>
    </div>
  )
}

export default CardStaff