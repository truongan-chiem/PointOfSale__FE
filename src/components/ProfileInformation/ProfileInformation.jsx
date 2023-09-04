import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../components/Input/Input";
import Button from "../Button/Button";
import { Notificationz } from "../Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { updateInfo } from "../../redux/Slice/userSlice";
const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  address: yup.string(),
  phoneNumber: yup
    .number()
    .typeError("Must be a number")
    .min(100000000, "At least 10 numbers")
    .max(9999999999, "Maximum 10 number"),
  birthday: yup.string(),
  location: yup.string(),
  postalCode: yup.number().typeError("Must be a number"),
  gender: yup.string().typeError("Must be a number"),
});

const ProfileInformation = () => {
  const [error, setError] = useState();

  const userInfo = useSelector((state) => state.user.information);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setError(null);
    delete data.image;
    delete data._id;
    delete data.__v;
    delete data.role;
    const dataForm = new FormData();
    Object.entries(data).forEach(([key,value],index) =>{
      dataForm.append(key,value)
    })

    dispatch(updateInfo({dataForm}))
  };


  const fillData = useCallback (() =>{
    Object.entries(userInfo).forEach(([key, value], index) => {
      setValue(key, value);
    });
  },[setValue,userInfo])


  useEffect(() => {
    if (userInfo) {
      
      fillData()
    }
  }, [userInfo,fillData]);

 

  useEffect(() => {
    Object.entries(errors).forEach(([key, value], index) => {
      if (index === 0) {
        setError({ [key]: value.message });
      }
    });
  }, [errors]);


  useEffect(() => {
    if (error) {
      const item = Object.entries(error)[0];
      Notificationz(`${item[0].substring(0, 5).toUpperCase()} : ${item[1]}`, "warning");
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="profile__tab__gender">
          <label>
            Male
            <input  name="gender" type="radio" value={"male"} {...register("gender")} />
            <span></span>
          </label>
          <label>
            Female
            <input   name="gender" type="radio" value={"female"} {...register("gender")} />
            <span></span>
          </label>
      </div>
      <div className="profile__tab__splitField">
        <Input
          placeholder="First name"
          className={`profile__tab__input ${error?.firstName && "errorInput"}`}
          left={"1rem"}
          {...register("firstName")}
        />
        <Input
          placeholder="Last name"
          className={`profile__tab__input ${error?.lastName && "errorInput"}`}
          left={"1rem"}
          {...register("lastName")}
        />
      </div>

      <Input
        placeholder="address"
        className={`profile__tab__input ${error?.address && "errorInput"}`}
        left={"1rem"}
        {...register("address")}
      />
      <div className="profile__tab__splitField">
        <Input
          placeholder="phone number"
          className={`profile__tab__input ${error?.phoneNumber && "errorInput"}`}
          left={"1rem"}
          {...register("phoneNumber")}
        />
        <Input
          placeholder="date of birth"
          className={`profile__tab__input ${error?.birthDay && "errorInput"}`}
          left={"1rem"}
          {...register("birthday")}
        />
      </div>
      <div className="profile__tab__splitField">
        <Input
          placeholder="nationality"
          className={`profile__tab__input ${error?.location && "errorInput"}`}
          left={"1rem"}
          {...register("location")}
        />
        <Input
          placeholder="postal code"
          className={`profile__tab__input ${error?.postalCode && "errorInput"}`}
          left={"1rem"}
          {...register("postalCode")}
        />
      </div>
      <div className="profile__tab__splitField">
        <Button className={"btn__outline"} onClick={ (e) => {
          e.preventDefault();
          fillData();
          clearErrors();
          setError();
          }}>discard changes</Button>
        <Button>save changes</Button>
      </div>
    </form>
  );
};

export default ProfileInformation;
