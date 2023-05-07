import axios from 'axios'
const API = axios.create({
    //localhost
    baseURL : process.env.REACT_APP_API,
    //deploy link
    // baseURL : "https://pos-coffeeshop-be.onrender.com"
})
export default API;