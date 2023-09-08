import Route from "./utils/router";
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
import { getInfoUser } from "./redux/Slice/userSlice";
import { connectSocket } from "./redux/Slice/socketSlice";
import axios from "axios";



function App() {
  const dispatch = useDispatch()
  console.log(process.env.NODE_ENV);
  axios.get(`http://${process.env.NODE_ENV === "development" ? window.location.hostname+":5000" : window.location.hostname}/ip`)
  .then(res =>{
    dispatch(connectSocket(res.data.ip));
  })
  .catch(err => console.log(err))

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id')
    if(user_id){
      dispatch(getInfoUser(user_id))
    }
  }, [dispatch]);


  return (
   <Route />
  );
}

export default App;
