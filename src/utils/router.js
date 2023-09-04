import React, { useEffect } from 'react'
import { Routes,Route,Navigate,Outlet, useLocation } from 'react-router-dom'

import Statistic from '../pages/Statistic/Statistic'
import Home from '../pages/Home/Home'
import Manage from '../pages/Manage/Manage'
import History from '../pages/History/History'
import Profile from '../pages/Profile/Profile'
import NotSupport from '../pages/NotSupport'
import Layout from '../components/Layout/Layout'
import Login from '../pages/Login/Login'
import ConfirmQRCode from '../pages/ConfirmQRCode/ConfirmQRCode'

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if(path === '/'){
      document.title = 'Home'
    }
    else if(path === '/login'){
      document.title = 'Point Of Sale'
    }
    else{
      const title = path.slice(1)
      document.title = title[0].toUpperCase() + title.substring(1);
    }
  }, [location]);

  return (
    <Routes>
        {/* private router */}
        <Route element = {<PrivateRoute />}>
          <Route exact path='/' element ={<Home />}/>
          <Route  path='/statistic' element ={<Statistic />}  /> 
          <Route  path='/history' element ={<History />}  /> 
          <Route  path='/manage' element ={<Manage  />}  /> 
          <Route  path='/profile' element ={<Profile />}  /> 
          <Route  path='*' element ={<NotSupport />}  /> 
        </Route>

        {/* public router */}
        <Route element = {<PublicRoute />} >
          <Route path='/login'   element = {<Login />}/>
        </Route>
        
        <Route  path='/qrcode' element ={<ConfirmQRCode />}  /> 

    </Routes>
  )
}



const PublicRoute = () => {
  const userId = sessionStorage.getItem("user_id");
 
  return userId ? <Navigate to={'/'} />: <Outlet />
}

const PrivateRoute = () => {
  const userId = sessionStorage.getItem("user_id");
  return(
    <>
    {userId ? <Layout> <Outlet /></Layout> : <Navigate to={'/login'}/>}
    </>
  )
}

export default Router