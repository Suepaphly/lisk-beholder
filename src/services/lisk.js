import { node } from "../config/config.json";
import axios from "axios";

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
    .get(node + "/api/v2/market/prices)
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return null;
    });


export const fetchSupplyInfo = (offset) =>
  axios
    .get(node + "/api/v2/accounts?limit=100&offset=" + offset)
    .then(res => res.data.data)
    .catch(err => {
      console.error(err);
      return null;
    });
