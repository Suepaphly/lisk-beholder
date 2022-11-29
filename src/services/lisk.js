const { apiClient } = require('@liskhq/lisk-client');
import axios from "axios";
let clientCache;

export const fetchForgerStats = async () => {
    const client = await getClient();;

};

export const fetchNodeInfo = async () => {
    const client = await getClient();

};

export const fetchDelegates = async () => {
    const client = await getClient();
    const delegates = await client.block.getByHeight(123)
    
};

export const fetchPriceInfo = async () => {
    const client = await getClient();

};

export const fetchCGInfo = () => 
  axios
    .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&developer_data=false")
    .then(res => res.data)
    .catch(err => {
      console.error(err);
      return null;
    });
