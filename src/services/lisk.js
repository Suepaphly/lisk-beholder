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
    console.log(forgerStats);
};

export const fetchNodeInfo = async () => {
    const client = await getClient();
    const nodeInfo = await client.node.getStatus();
    // Do something with nodeInfo
    console.log(nodeInfo);
};

export const fetchDelegates = async () => {
    const client = await getClient();
    const delegates = await client.block.getByHeight(123);
    // Do something with delegates
    console.log(delegates);
};

export const fetchPriceInfo = async () => {
    const client = await getClient();
    const priceInfo = await client.market.getTicker();
    // Do something with priceInfo
    console.log(priceInfo);
};

export const fetchCGInfo = () => 
  axios
    .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&developer_data=false")
    .then(res => res.data)
    .catch(err => {
      console.error(err);
      return null;
    });

