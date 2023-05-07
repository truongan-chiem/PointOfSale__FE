import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {useDispatch,useSelector} from 'react-redux'

import Input from "../../components/Input/Input";
import Button from "../Button/Button";
import {Notificationz} from '../Notification/Notification'
import { changePassword, resetChangepw } from "../../redux/Slice/userSlice";

const schema = yup.object().shape({
  currentPassword : yup.string(),
  newPassword : yup.string(),
  rePassword : yup.string().oneOf([yup.ref("newPassword"), null], "Re-Password not match !!!"),
});

const ChangePassword = () => {
  const [error, setError] = useState();
  const dispatch = useDispatch()
  const {success,message} = useSelector(state => state.user.changepw)
  const { register, handleSubmit,reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    delete data.rePassword
    console.log(data);
    dispatch(changePassword(data))
    reset()
  }
  useEffect(() => {
    Object.values(errors).forEach((element,index )=>{
      if(index === 0){
        setError(element.message)
      }
    })
  }, [errors]);

  useEffect(() => {
    if(success){
      Notificationz(message)
      dispatch(resetChangepw())
    }
    else{
      setError(message)
    }
  }, [success,message,dispatch]);

  useEffect(() => {
    if(error){
      Notificationz(error , 'error')
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input  left={"1rem"}  type = "password" placeholder="current password" className={"profile__tab__input"} {...register('currentPassword')} />
      <Input  left={"1rem"}  type = "password" placeholder="new password" className={"profile__tab__input"} {...register('newPassword')} />
      <Input  left={"1rem"}  type = "password" placeholder="re new password" className={"profile__tab__input"} {...register('rePassword')} />
      <div className="profile__tab__splitField">
        <Button onClick={() => reset()} className={"btn__outline"} disabled>discard changes</Button>
        <Button >save changes</Button>
      </div>
    </form>
  );
};

export default ChangePassword;
