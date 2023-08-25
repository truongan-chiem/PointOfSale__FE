import { useCallback, useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import {MdDateRange} from 'react-icons/md'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateRange.scss'
import useWindowSize from '../../hook/useWindowSize'


const DateRange = ({setDate , history = false }) => {
  const {width} = useWindowSize()
  // date state
  const [range, setRange] = useState([
    {
      startDate: history ? new Date() :  new Date(new Date().getFullYear(),new Date().getMonth(),1),
      endDate: new Date(),
      // endDate: history ? new Date() : new Date(new Date().getFullYear(),new Date().getMonth() + 1,0),
      key: 'selection'
    }
  ])
  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }
  const selectDatePicker = useCallback (() =>{
    
    setDate({start : range[0].startDate , end : range[0].endDate})
  },[range,setDate])

  useEffect(() => {
    if(!open){
      selectDatePicker();
    }
  }, [open,selectDatePicker])
  

  

  return (
    <div className="calendarWrap">

      <div
          onClick={ () => setOpen(open => !open) }
          className = "calendarWrap__input"
      >
       { !history && <input
          value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
          readOnly
          className="inputBox"
        />}
        <MdDateRange  className={history ? "dateHistory" : ""}/>
      </div>
      <div ref={refOne}>
        {open && 
          <DateRangePicker
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={width > 1024 ? 2 : 1}
            direction="horizontal"
            className="calendarElement"
            rangeColors={['#704332','#704332']}
          />
        }
      </div>

    </div>
  )
}

export default DateRange