import axios from 'axios'

const API = axios.create({
    //localhost
    baseURL : "http://localhost:5000",
    //deploy link
    // baseURL : "https://pos-coffeeshop-be.onrender.com"
})
export default API;