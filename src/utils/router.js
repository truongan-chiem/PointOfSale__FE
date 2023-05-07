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

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if(path === '/'){
      document.title = 'Home'
    }
    else if(path === '/login'){
      document.title = 'POS-CoffeeShop'
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

    </Routes>
  )
}

const auth = () =>{
  const userId = localStorage.getItem('user_id')
  return userId ? true : false;
}

const PublicRoute = () => {
  // const isLogin = useSelector(state => state.user.information)
  const isLogin = auth();
  return isLogin ? <Navigate to={'/'} />: <Outlet />
}

const PrivateRoute = () => {
  // const isLogin = useSelector(state => state.user.information)
  const isLogin = auth();
  return(
    <>
    {isLogin ? <Layout> <Outlet /></Layout> : <Navigate to={'/login'}/>}
    </>
  )
}

export default Router