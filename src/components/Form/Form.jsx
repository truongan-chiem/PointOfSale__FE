import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Notificationz } from "../Notification/Notification";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { FiUpload } from "react-icons/fi";
import { createNewProduct, resetErrorSetting, updateProduct } from "../../redux/Slice/productSlice";
import "./Form.scss";
import Loading from "../Loading/Loading";
import { toggleModalForm } from "../../redux/Slice/modalSlice";
import { fetchImg } from "../../utils/fetchImage";
import useFilePreview from "../../hook/useFIlePreview";
import DropDown from "../DropDown/DropDown";

const Form = ({ data, setToggleFormEdit }) => {
  const idInputFile = useId();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.setting.error);
  const isLoading = useSelector((state) => state.products.setting.isLoading);

  const listType = [
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
  ];


  useEffect(() => {
    if (data) {
      let img = fetchImg(data.image.url);
      img.then((res) => setFormData((prev) => ({ ...prev, image: res })));
    }
  }, [data]);
  const [formData, setFormData] = useState({
    name: data?.name || "",
    decs: data?.desc || "",
    price: data?.price || "",
    quantity :data?.quantity || "",
    image: null,
    selectType: data?.type || listType[0].value,
  });


 

  useEffect(() => {
    if (error?.message) {
      Notificationz(error.message, "error");
    } else if (error === "") {
      Notificationz("Success!!!");
      if (data) {
        setToggleFormEdit(false);
      } else {
        dispatch(toggleModalForm());
      }
    }
  }, [error, dispatch, data, setToggleFormEdit]);

  useEffect(() => {
    return () => {
      dispatch(resetErrorSetting());
    };
  }, [dispatch]);

  const handleBtn = async () => {
      if (
        formData.name === "" ||
        formData.decs === "" ||
        formData.image === null ||
        formData.price === "" ||
        formData.quantity === "" 
      ) {
        Notificationz("Some Fields Are Empty!!!", "warning");
      } else {
        let dataForm = new FormData();
        dataForm.append("name", formData.name);
        dataForm.append("desc", formData.decs);
        dataForm.append("price", formData.price);
        dataForm.append("type", formData.selectType);
        dataForm.append("image", formData.image);
        dataForm.append("quantity", formData.quantity);
        if (data) {
          dispatch(updateProduct({ _id: data._id, dataForm }));
        } else {
          dispatch(createNewProduct(dataForm));
        }
      }
  };
 
  //preview image
  const [filePreview] = useFilePreview(formData.image, "single");

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      {isLoading && <Loading />}
      <h2 className="form__header">{data ? "edit" : "Add"} product</h2>
        <div className="form__body">
          <div className="form__wrapInput">
            <Input
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className={"form__wrapInput__item"}
              placeholder={"Name Item"}
              value={formData.name}
              left={"1rem"}
            />
            <Input
              className={"form__wrapInput__item"}
              placeholder={"Price Item"}
              left={"1rem"}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              value={formData.price}
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
