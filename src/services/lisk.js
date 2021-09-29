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
    .get(node + "/api/v2/market/prices")
    .then(res => res.data.data[3].rate)
    .catch(err => {
      console.error(err);
      return null;
    });


export const fetchSupplyInfo = () => {

let promises = [];
let balance = 0;
let votes = 0;
for (let i = 0; i < 50000; i++) {
  promises.push(
    axios.get(node + "/api/v2/accounts?sort=balance:desc&limit=100&offset=" + i).then(res => {
      balance = balance + (res.data.data.summary.balance / 100000000);
      for(let y = 0; y < res.data.data.dpos.sentVotes.length; y++){
           votes = votes + (res.data.data.dpos.sentVotes[y].amount / 100000000);
      }
    }).catch(err => {
      console.error(err);
      return null;
    })
  )
}
  
Promise.all(promises).then(() => [{"total":balance}, {"locked":votes}])};
