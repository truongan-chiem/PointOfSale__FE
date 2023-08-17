import React, { useEffect, useState } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUpload } from "react-icons/fi";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { Notificationz } from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { createAccount, updateAccount } from "../../redux/Slice/accountSlice";
import Loading from "../Loading/Loading";
import { fetchImg } from "../../utils/fetchImage";
import useFilePreview from "../../hook/useFIlePreview";
import DropDown from "../DropDown/DropDown";


const listType = [
  {
    value: "staff",
  },
  {
    value: "manager",
  },
  {
    value: "admin",
  }
];

const FormCreate = ({ setToggleForm, dataEdit }) => {
  const idInputFile = useId();

  const schemaCreate = yup.object().shape({
    firstName: yup.string().required("Please Enter First Name!!!"),
    lastName: yup.string().required("Please Enter Last Name!!!"),
    gender: yup.number().required("Please Choose Gender!!!"),
    image: yup.mixed().test("required", "You need to provide a image!!!", (file) => {
      if (file.length > 0) return true;
      return false;
    }),
    
    account: yup.string().required("Please Enter Account!!!"),
    password: yup.string().required("Please Enter Password!!!"),
    rePassword: yup
      .string()
      .required("Please Enter re-password!!!")
      .oneOf([yup.ref("password"), null], "Password must match !!!"),
   
  });
  const schemaEdit = yup.object().shape({
    firstName: yup.string().required("Please Enter First Name!!!"),
    lastName: yup.string().required("Please Enter Last Name!!!"),
    gender: yup.number().required("Please Choose Gender!!!"),
    image: yup.mixed().test("required", "You need to provide a image!!!", (file) => {
      if (file.length > 0) return true;
      return false;
    })
   
  });

  
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(dataEdit ? schemaEdit :schemaCreate),
  });

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.createAcc.isLoading);

  //preview file image
  const file = watch(["image"]);
  const [filePreview] = useFilePreview(file[0]);

  useEffect(() => {
    Object.entries(errors).forEach(([key, value], index) => {
      if (index === 0) {
        Notificationz(value.message, "warning");
      }
    });
  }, [errors]);

  // thêm các giá trị vào các field trong trường hợp form Edit
  useEffect(() => {
    if (dataEdit) {
      fetchImg(dataEdit.image.url).then((res) => {
        Object.entries(dataEdit).forEach(([key, value]) => {
          if (key === "gender") {
            setValue(key, value === "male" ? "0" : "1");
          } else if (key === "image") {
            var dt = new DataTransfer();
            dt.items.add(res);
            setValue(key, dt.files);
          } else {
            setValue(key, value);
          }
        });
      });


    }
  }, [dataEdit, setValue]);

  const onSubmit = (data) => {
    const dataForm = new FormData();
    dataForm.append("gender", data.gender === 0 ? "male" : "female");
    dataForm.append("lastName", data.lastName);
    dataForm.append("firstName", data.firstName);
    dataForm.append("role", formData.selectType === 'staff' ? 0 : formData.selectType === 'manager' ? 1 : 2 );
    dataForm.append("image", data.image[0]);
    if(dataEdit){
      dispatch(updateAccount({id :dataEdit._id , dataForm ,setToggleForm}))
    }
    else{
      dataForm.append("account", data.account);
      dataForm.append("password", data.password);
      dispatch(createAccount({dataForm,setToggleForm}));
    }

  };
  const [formData, setFormData] = useState({
    selectType : listType[dataEdit.role || 0].value
  })

  return (
    <>
      <form className="form-addAccount" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-addAccount__header">{dataEdit ? "Edit" : "Create"} Account</h1>
        <div className="form-addAccount__wrapInput">
          <Input
            placeholder="First name"
            {...register("firstName")}
            left= "1rem"
            className={errors?.firstName ? "errorInput" : ""}
          />
          <Input
            placeholder="Last name"
            {...register("lastName")}
            left= "1rem"
            className={errors?.lastName ? "errorInput" : ""}
          />
        </div>
        <h4>Gender</h4>
        <div className="profile__tab__gender">
          <label>
            Male
            <input checked name="gender" type="radio" value={0} {...register("gender")} />
            <span></span>
          </label>
          <label>
            Female
            <input name="gender" type="radio" value={1} {...register("gender")} />
            <span></span>
          </label>
        </div>
        {!dataEdit && (
          <>
            <Input
              placeholder="Account"
              {...register("account")}
              className={errors?.account ? "errorInput" : ""}
              left= "1rem"
            />
            <Input
              placeholder="password"
              type = "password"
              {...register("password")}
              left= "1rem"
              className={errors?.password ? "errorInput" : ""}
            />
            <Input
              placeholder="re-password"
              type = "password"
              {...register("rePassword")}
              left= "1rem"
              className={errors?.rePassword ? "errorInput" : ""}
            />
          </>
        )}
        <DropDown formData={formData} setFormData= {setFormData} listType= {listType} />
        <div
          className={`form__file ${errors?.image ? "errorInput" : ""}`}
          onClick={() => document.getElementById(idInputFile).click()}
          style={filePreview ? {padding : "1rem"} : {padding : '4rem'}}
        >
          <input
            onClick={(e) => (e.target.value = "")}
            type="file"
            id={idInputFile}
            {...register("image")}
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
        <div className="form-addAccount__btn">
          <Button>{dataEdit ? "Update" : "Create"}</Button>
        </div>
      </form>
      {isLoading && <Loading />}
    </>
  );
};

export default FormCreate;
