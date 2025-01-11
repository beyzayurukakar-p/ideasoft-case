import Axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://testcase.myideasoft.com/';

// TODO: This should be stored in .env file
const TOKEN = 'AX5FTZ7UBAABUDT6XYYPW7LX';

export const client: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});
