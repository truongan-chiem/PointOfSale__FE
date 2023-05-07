import { useState } from 'react'
import { useEffect } from 'react'

const useDebounce = (value,timeOut) => {

    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() =>{
        setDebouncedValue(value)
      },timeOut)

      return () =>{
        clearTimeout(handler)
      }
    }, [value,timeOut])
    

  return debouncedValue
}

export default useDebounce