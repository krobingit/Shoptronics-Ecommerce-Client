import axios from 'axios';

export const commonRequest = axios.create({
baseURL:"https://shoptronics-ecommerce.herokuapp.com/"})