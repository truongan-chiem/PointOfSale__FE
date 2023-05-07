import React, { useEffect, useRef, useState } from "react";

import "./Header.scss";

import Input from "../Input/Input";
import { AiOutlineSearch,AiOutlineLoading,AiOutlineShoppingCart } from "react-icons/ai";
import PopupSearch from "../PopupSearch/PopupSearch";
import useDebounce from "../../hook/useDebounce";
import API from "../../API";
import useWindowSize from "../../hook/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { toggleBill } from "../../redux/Slice/toggleBillSlice";

const Header = ({ title, type = "only-title" }) => {
  const [searchValue, setSearchValue] = useState();
  const debounceValue = useDebounce(searchValue, 1000);

  const [loading, setLoading] = useState(false)
  const [resultSearch, setResultSearch] = useState([]);
  const [openPopup, setOpenPopup] = useState(false)
  const dispatch = useDispatch();
  const {width} = useWindowSize();

  const bills = useSelector(state => state.products.bill.orders)

  useEffect(() => {
   
    if (debounceValue) {

        setLoading(true)
        API.get(`/product?name=${debounceValue}`)
        .then(res =>{
          if(res.status === 200 && res.data){
            setResultSearch(res.data)
            setOpenPopup(true)
          }
          else{
            console.log(res);
            setOpenPopup(false)
          }
          setLoading(false)
        })
       

    }
  }, [debounceValue]);

 const [toggleSearch, setToggleSearch] = useState(false)
 const searchRef = useRef();

 useEffect(() => {
  const handleOutSide = e =>{
    if(searchRef.current && !searchRef.current.contains(e.target)){
      setToggleSearch(false)
    }
  }
  document.addEventListener('click',handleOutSide)

  return () =>{
    document.removeEventListener('click',handleOutSide)
  }
}, [])
 


  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <div className="header__right">
      {type !== "only-title" && (
        <div className="header__right__search" onClick={() => setToggleSearch(true)} ref={searchRef}>
          <Input
            placeholder={"Search category or menu ..."}
            className={`header__right__search__input ${toggleSearch ? 'openSearch' : ''}`}
            isSeach={true}
            icon={loading ? <AiOutlineLoading className="loadingSearch"/> : <AiOutlineSearch />}
            left={width <= 1024 ? "1rem" : "2rem"}
            onChange={(e) => setSearchValue(e.target.value)}
            value = {searchValue}
            onBlur = {() => {
              setOpenPopup(false)
              setSearchValue("")
            }}
          />
          {openPopup && <PopupSearch resultSearch = {resultSearch}/>}
        </div>
      )}
      {width <= 1024 && type !== "only-title" &&  <div className="header__right__cart" onClick={() => dispatch(toggleBill())}>
          <AiOutlineShoppingCart />
          <span>{bills.reduce((total , item) =>  total += item.number , 0)}</span>
        </div>}
      </div>
    </header>
  );
};

export default Header;
