import axios from 'axios';

const accessKey = '_3vQPtdPt-S1AmVMtFqszRY4AHDAjRUUkOhsRzZ048k';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${accessKey}`
  },
  params: {
    orientation: 'squarish',
    per_page: 8
  }
})