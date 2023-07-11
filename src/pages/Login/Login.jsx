import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {Notificationz} from '../../components/Notification/Notification'
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { login, resetError } from "../../redux/Slice/userSlice";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import useWindowSize  from '../../hook/useWindowSize'

const Login = () => {
  const [formData, setFormData] = useState({ account: "", password: "" });
  const [error, setError] = useState(null);
  const errorAPI = useSelector((state) => state.user.login.errorAPI);
  const isLoading = useSelector((state) => state.user.login.isLoading);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.account === "" || formData.password === "") {
      setError("Account or Password Empty!!!");
    } else {
      dispatch(login(formData));
    }
  };
  useEffect(() => {
    return () =>{
      dispatch(resetError())
    }
  }, [dispatch]);

  useEffect(() => {
    setError(errorAPI);
  }, [errorAPI]);

  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      Notificationz(error, "error");
    }
    else if (error === ''){
      Notificationz("Login Success!!!");
      navigate('/')
    }
  }, [error,navigate]);

  const {width} = useWindowSize()

  return (
    <div className="login">
      {isLoading && <Loading />}
      <div className="login__background"></div>
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="login__form__header">Login</h1>
        <Input
          value={formData.account}
          onChange={(e) => setFormData((prev) => ({ ...prev, account: e.target.value }))}
          className={`login__form__input ${error ? 'error' :''}`}
          left = {width <= 768 ? '1rem' : '2rem'}
          placeholder="Account"
        />
        <Input
          value={formData.password}
          onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
          className={`login__form__input ${error ? 'error' :''}`}
          type = "password"
          left = {width <= 768 ? '1rem' : '2rem'}
          placeholder="Password"
        />
        <Button className={"login__form__btn"}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
