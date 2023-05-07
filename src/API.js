import axios from 'axios'
const API = axios.create({
    //localhost
    baseURL : process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_PRODUCTION : process.env.REACT_APP_API_DEVELOPMENT,
    //deploy link
    // baseURL : "https://pos-coffeeshop-be.onrender.com"
})
export default API;