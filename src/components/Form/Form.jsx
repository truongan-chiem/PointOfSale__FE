import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Notificationz } from "../Notification/Notification";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { FiUpload } from "react-icons/fi";
import { createNewProduct , updateProduct } from "../../redux/Slice/productSlice";
import "./Form.scss";
import Loading from "../Loading/Loading";
import { toggleModalForm } from "../../redux/Slice/modalSlice";
import { fetchImg } from "../../utils/fetchImage";
import useFilePreview from "../../hook/useFIlePreview";
import DropDown from "../DropDown/DropDown";
import { formatNumber } from "../../utils/formatCurrency";

const Form = ({ data, setToggleFormEdit }) => {
  const idInputFile = useId();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.setting.isLoading);

  const listType = useMemo(() => [
    {
      value: "laptop",
    },
    {
      value: "pc",
    },
    {
      value: "phone",
    },
    {
      value: "audio",
    },
    {
      value: "accessory",
    }
  ],[]);

  useEffect(() => {
    if (data) {
      let img = fetchImg(data.image.url);
      img.then((res) => setFormData((prev) => ({ ...prev, image: res })));
    }
  }, [data]);

  useEffect(() => {
    const handleExitForm = e =>{
      if(e.keyCode === 27){
        if(data){
          setToggleFormEdit(false);
        }
        else{
          dispatch(toggleModalForm())
        }
      }
    }

    window.addEventListener('keyup', handleExitForm)

    return () =>{
      window.removeEventListener('keyup',handleExitForm)
    }
  }, [dispatch,data,setToggleFormEdit])
  

  const [formData, setFormData] = useState({
    name: data?.name || "",
    decs: data?.desc || "",
    price: (data?.price && formatNumber(String(data.price))) || "",
    originalPrice: (data?.originalPrice && formatNumber(String(data.originalPrice))) || "",
    qrScan: data?.qrScan || "",
    quantity :data?.quantity || "",
    image: null,
    selectType: data?.type || listType[0].value,
  });

  //preview image
  const [filePreview,setFilePreview] = useFilePreview(formData.image, "single");

  const resetForm = useCallback(() =>{
    setFormData({
      name: "",
      decs:  "",
      price:  "",
      originalPrice: "",
      qrScan: "",
      quantity : "",
      image: null,
      selectType: listType[0].value,
    })
    setFilePreview(null);
  },[listType,setFilePreview])

  const handleBtn = async () => {
      if (
        formData.name === "" ||
        formData.decs === "" ||
        formData.image === null ||
        formData.price === "" ||
        formData.quantity === "" ||
        formData.originalPrice === "" ||
        formData.qrScan === "" 
      ) {
        Notificationz("Some Fields Are Empty!!!", "warning");
      } else {
        let dataForm = new FormData();


        dataForm.append("name", formData.name);
        dataForm.append("desc", formData.decs);
        dataForm.append("price", Number(formData.price.replaceAll('.','')));
        dataForm.append("type", formData.selectType);
        dataForm.append("image", formData.image);
        dataForm.append("quantity", formData.quantity);
        dataForm.append("originalPrice", Number(formData.originalPrice.replaceAll('.','')));
        dataForm.append("qrScan", formData.qrScan);
        if (data) {
          dispatch(updateProduct({ _id: data._id, dataForm , setToggleFormEdit}));
        } else {
          dispatch(createNewProduct({dataForm,resetForm}));
        }
      }
  };
 


  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      {isLoading && <Loading />}
      <h2 className="form__header">{data ? "edit" : "Add"} product</h2>
        <div className="form__body">
          <div className="form__wrapInput">
            <Input
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className={"form__wrapInput__item"}
              placeholder={"Name"}
              value={formData.name}
              left={"1rem"}
              autoFocus = {data ? false : true}
            />
            <Input
              className={"form__wrapInput__item"}
              placeholder={"QR Scan"}
              disabled = {data ? true : false}
              left={"1rem"}
              onChange={(e) => setFormData((prev) => ({ ...prev, qrScan: e.target.value }))}
              value={formData.qrScan}
            />
          </div>
          <div className="form__wrapInput">
            <Input
              className={"form__wrapInput__item"}
              placeholder={"Original Price"}
              left={"1rem"}
              onChange={(e) => Number(e.target.value.replaceAll(".","")) <= 10000000000 && setFormData((prev) => ({ ...prev, originalPrice: formatNumber(e.target.value) }))}
              value={formData.originalPrice}
            />
            <Input
              onChange={(e) => Number(e.target.value.replaceAll(".","")) <= 10000000000 &&  setFormData((prev) => ({ ...prev, price: formatNumber(e.target.value) }))}
              className={"form__wrapInput__item"}
              placeholder={"Price"}
              value={formData.price}
              left={"1rem"}
            />
          </div>
          <Input
            onChange={(e) => setFormData((prev) => ({ ...prev, decs: e.target.value }))}
            value={formData.decs}
            placeholder={"Decription"}
            left={"1rem"}
            className={"form__wrapInput__item"}
          />
          <div
            className="form__file"
            onClick={() => document.getElementById(idInputFile).click()}
            style={filePreview ? { padding: 0 } : { padding: "4rem" }}
          >
            <input
              onClick={(e) => (e.target.value = "")}
              type="file"
              id={idInputFile}
              onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))}
            />
            {filePreview ? (
              <img src={filePreview} alt="" width={"150px"} height="150px" />
            ) : (
              <>
                <FiUpload />
                <span>Choose Image Dish</span>
              </>
            )}
          </div>
          <div className="form__dropdown">
            <DropDown formData={formData} setFormData= {setFormData} listType ={listType}/>
            <Input
              onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
              value={formData.quantity}
              placeholder={"Quantity"}
              left={"1rem"}
              className={"form__wrapInput__item"}
            />
          </div >
        </div>
      
      <div className="form__btn">
        <Button onClick={handleBtn}>
          {data ? "Update Product" : "Add New Product"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
