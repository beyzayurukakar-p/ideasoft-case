import Axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://testcase.myideasoft.com/';

export const client: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
