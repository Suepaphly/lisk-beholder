
import axios from "axios";
const { apiClient } = require('@liskhq/lisk-client');
let clientCache;

export const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient('ws://localhost:8080/ws');
    }
    return clientCache;
};

export const useClient = async () => {
    const client = await getClient();
    client.subscribe('pluginAlias:eventAlias', ({ data }) => {
      console.log(data.info);
    });
};

export const fetchForgerStats = async () => {
    const client = await getClient();
    const forgerStats = await client.forger.getStatistics();
    // Do something with forgerStats
};

export const fetchNodeInfo = async () => {
    const client = await getClient();
    const nodeInfo = await client.node.getStatus();
    // Do something with nodeInfo
};

export const fetchDelegates = async () => {
    const client = await getClient();
    const delegates = await client.block.getByHeight(123);
    // Do something with delegates
};

export const fetchPriceInfo = async () => {
    const client = await getClient();
    const priceInfo = await client.market.getTicker();
    // Do something with priceInfo
};

export const fetchCGInfo = () => 
  axios
    .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&developer_data=false")
    .then(res => res.data)
    .catch(err => {
      console.error(err);
      return null;
    });


    //This code exports several functions that use the Lisk API client to fetch various types of information from a Lisk node running on the localhost. 
    //The getClient function creates a WebSocket client for the node if one doesn't already exist and stores it in a cache. 
    //The useClient function subscribes to an event from the node using the client. 
    //The fetchForgerStats, fetchNodeInfo, fetchDelegates, and fetchPriceInfo functions use the client to fetch forger statistics, node status, block information by height, and market ticker information respectively. 
    //The fetchCGInfo function uses the axios library to make a GET request to the CoinGecko API to fetch information about Lisk. 
    //It returns the data from the API or null if there is an error.
