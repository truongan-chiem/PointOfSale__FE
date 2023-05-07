import React, { useEffect } from 'react'
import './Loading.scss'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
const Loading = () => {
  useEffect(() => {
    const handlePrevent = e => e.preventDefault();
    document.addEventListener('click', handlePrevent)
  
    return () => {
      document.removeEventListener('click' , handlePrevent)
    }
  }, [])
  
  return (
    <div className='loading'>
        <AiOutlineLoading3Quarters />
    </div>
  )
}

export default Loading