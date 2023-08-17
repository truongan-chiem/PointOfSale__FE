import React from 'react'

import "./Pagination.scss"
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

const Pagination = ({currentPage,totalPage,getData}) => {


    const handleNextPage = () =>{
        if(currentPage.current < totalPage){
            currentPage.current+=1;
            getData(currentPage.current)
        }
    }
    const handlePrevPage = () =>{
        if(currentPage.current > 1){
            currentPage.current-=1;
            getData(currentPage.current)
        }
    }

    

  return (
    <div className='pagination'>
        <button className={`pagination__btn ${currentPage.current < 2 ? "disable" : ""}`} onClick={handlePrevPage}>
            <AiFillCaretLeft />
        </button>
        
       { currentPage.current > 2 && <button className= "pagination__btn" onClick={() => { 
            currentPage.current = 1
            getData(currentPage.current)
        }}>
            1
        </button>}
       { currentPage.current > 1 && <button className= "pagination__btn" onClick={() => { 
            currentPage.current -=1
            getData(currentPage.current)
        }}>
            {currentPage.current - 1}
        </button>}
        <button className= "pagination__btn active">
            {currentPage.current}
        </button>
        {totalPage - currentPage.current > 1 && <button className= "pagination__btn" onClick={() => {
            currentPage.current+=1;
            getData(currentPage.current)}}>
            {currentPage.current + 1}
        </button>}
    
        {totalPage > 4 && totalPage - currentPage.current > 2 &&  <button className='pagination__btn'>
            ...
        </button>}
        {currentPage.current < totalPage && <button className='pagination__btn' onClick={() => {
            currentPage.current = totalPage
            getData(totalPage)}
            }>
            {totalPage}
        </button>}
        <button className={`pagination__btn ${currentPage.current >= totalPage ? "disable" : ""}`} onClick={handleNextPage}>
            <AiFillCaretRight />
        </button>
    </div>
  )
}

export default Pagination