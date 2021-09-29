import { node } from "../config/config.json";
import { key } from "../config/cmc.json";
import axios from "axios";
const CoinMarketCap = require('coinmarketcap-api');



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

export const fetchCGInfo = () => 
  axios
    .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&developer_data=false")
    .then(res => res.data)
    .catch(err => {
      console.error(err);
      return null;
    });
