import { node } from "../config/config.json";
import { key } from "../config/cmc.json";
import axios from "axios";
const rp = require('request-promise');



export const fetchForgerStats = () =>
  axios
    .get(node + "/api/v2/forgers?limit=3")
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return [];
    });

export const fetchNodeInfo = () =>
  axios
    .get(node + "/api/v2/network/status")
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return null;
    });

export const fetchDelegates = (offset) =>
      axios
        .get(node + "/api/v2/accounts?isDelegate=true&status=active&limit=100&offset=" + offset)
        .then(res => res.data.data)
        .catch(err => {
        console.error(err)
      });

export const fetchPriceInfo = () =>
  axios
    .get(node + "/api/v2/market/prices")
    .then(res => res.data.data[2].rate)
    .catch(err => {
      console.error(err);
      return null;
    });

export const fetchCMCInfo = () => {
  
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': key
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);
}).catch((err) => {
  console.log('API call error:', err.message);
});

};

