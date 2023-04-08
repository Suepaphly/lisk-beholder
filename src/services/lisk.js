import axios from "axios";


const message = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

export const fetchForgerStats = async () => {
  
    const socket = new WebSocket('wss://testnet3-api.lisknode.io/ws');
    const forgerStats = await socket.onopen = function(evt) { socket.send(message);  websocket.close();};
  
    console.log(message);
    console.log(forgerStats);
    const forgerStatsArray = JSON.parse(forgerStats);
    return forgerStatsArray;
};

export const fetchNodeInfo = async () => {
  
    const socket = new WebSocket('wss://testnet3-api.lisknode.io/ws');
    const nodeInfo = await socket.onopen = function(evt) { socket.send(message);  websocket.close();};
    
    console.log(nodeInfo);
    const nodeInfoArray = JSON.parse(nodeInfo);
    return nodeInfoArray;
};

export const fetchDelegates = async () => {
  
    const socket = new WebSocket('wss://testnet3-api.lisknode.io/ws');
    const delegates = await socket.onopen = function(evt) { socket.send(message);  websocket.close();};
    
    console.log(delegates);
    const delegatesArray = JSON.parse(delegates);
    return delegatesArray;
};

export const fetchPriceInfo = async () => {
  
    const socket = new WebSocket('wss://testnet3-api.lisknode.io/ws');
    const priceInfo = await socket.onopen = function(evt) { socket.send(message);  websocket.close();};
    
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
