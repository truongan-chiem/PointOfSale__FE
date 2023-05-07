import React from 'react'
import {useDispatch} from 'react-redux'

import {BsPlusLg} from 'react-icons/bs'

import './CardItemSetting.scss'
import { toggleModalForm } from '../../redux/Slice/modalSlice'
const CardAddItemSetting = () => {
  const dispatch = useDispatch()
  return (
    <div className='card-add' onClick={() => dispatch(toggleModalForm())}>
        <div>
            <BsPlusLg />
            <p>Add new product</p>
        </div>
    </div>
  )
}

export default CardAddItemSetting