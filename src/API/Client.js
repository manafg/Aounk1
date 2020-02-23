import axios from 'axios';
import {AsyncStorage} from 'react-native';

const token =  AsyncStorage.getItem('Token');
var Client = axios.create({
    baseURL: 'http://api.ibshr.com/api',
    timeout: 5000,
    headers: {
      Accept: 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`
  },
  });
  //ss
 export default Client;