import axios from 'axios';

export const commonRequest = axios.create({
baseURL:"http://localhost:7000/"})