import { node } from "../config/config.json";
import { api_key } from "../config/cmc.json";
import axios from "axios";

const CoinMarketCap = require('coinmarketcap-api');
const client = new CoinMarketCap(apiKey);


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

export const fetchCMCInfo = () =>
  client
    .getQuotes({symbol: 'LSK'})
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return null;
    });

