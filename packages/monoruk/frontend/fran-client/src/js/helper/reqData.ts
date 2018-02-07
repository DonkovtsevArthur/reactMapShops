import axios from 'axios';
import { API_URL } from '../constants';

const reqData = axios.create({
  baseURL: API_URL
});

export const reqGraphData = axios.create({
  baseURL: API_URL
});

export default reqData;
