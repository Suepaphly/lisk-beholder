import axios from "axios";


const message = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

const request = async (method, params) => new Promise(resolve => {
    const socket = new WebSocket('wss://testnet3-api.lisknode.io/ws');

    socket.onopen = () => {
        socket.send(JSON.stringify({ jsonrpc: '2.0', method, params }));
    };

    socket.onmessage = (event) => {
        const answer = JSON.parse(event.data);
        socket.close();
        resolve(answer);
    };
});

export const useClient = async () => {
    const data = await request('pluginAlias:eventAlias', {});
    return data.info;
};

export const fetchForgerStats = async () => {
    const forgerStats = await request(message);
    
    console.log(forgerStats);
    const forgerStatsArray = JSON.parse(forgerStats);
    return forgerStatsArray;
};

export const fetchNodeInfo = async () => {
    const nodeInfo = await request(message);
    
    console.log(nodeInfo);
    const nodeInfoArray = JSON.parse(nodeInfo);
    return nodeInfoArray;
};

export const fetchDelegates = async () => {
    const delegates = await request(message);
    
    console.log(delegates);
    const delegatesArray = JSON.parse(delegates);
    return delegatesArray;
};

export const fetchPriceInfo = async () => {
    const priceInfo = await request(message);
    
    const priceInfoArray = JSON.parse(priceInfo);    
    console.log(priceInfo);
    return priceInfoArray;
};

export const fetchCGInfo = () =>
    axios
        .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&")
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            return null;
        });
