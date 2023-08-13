import Route from "./utils/router";
import {useDispatch} from 'react-redux'
import { useEffect } from "react";
import { getAllProduct } from "./redux/Slice/productSlice";
import { getInfoUser } from "./redux/Slice/userSlice";
import { connectSocket } from "./redux/Slice/socketSlice";



function App() {
  const dispatch = useDispatch()

  dispatch(connectSocket());

  useEffect(() => {
    dispatch(getAllProduct())
    const user_id = localStorage.getItem('user_id')
    if(user_id){
      dispatch(getInfoUser(user_id))
    }
  }, [dispatch]);


  return (
   <Route />
  );
}

export default App;
