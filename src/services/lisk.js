import axios from "axios";
import io from 'socket.io-client';

const WS_RPC_ENDPOINT = 'wss://service.lisk.com/rpc-v2';

const socket = io(WS_RPC_ENDPOINT, {
  forceNew: true,
  transports: ['websocket']
});

const nodeInfoMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

export const fetchCGInfo = async () => {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&"
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const nodeSocket = new WebSocket('wss://api.lisknode.io/ws');

export const fetchNodeInfo = async () => {
  const nodeInfoPromise = new Promise((resolve, reject) => {
    nodeSocket.onopen = function (evt) {
      nodeSocket.send(nodeInfoMessage);
    };
    nodeSocket.onmessage = function (evt) {
      const nodeInfoArray = JSON.parse(evt.data);
      resolve(nodeInfoArray);
    };
    nodeSocket.onerror = function (evt) {
      reject(evt);
    };
  });

  const nodeInfo = await nodeInfoPromise;
  console.log(nodeInfo);
  return nodeInfo;
};

export const fetchForgerStats = async () => {  
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      jsonrpc: '2.0',
      method: 'get.forgers',
      params: {limit: "5", offset: "0"} 
    }, answer => {
      if (answer.error) {
        reject(answer.error);
      } else {
        console.log(answer.result.data);
        resolve(answer.result.data);
      }
    });
  });
};


export const fetchDelegates = async () => {
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      jsonrpc: '2.0',
      method: 'get.accounts',
      params: {status: "active", limit: "103", offset: "0"} 
    }, answer => {
      if (answer.error) {
        reject(answer.error);
      } else {
        console.log(answer.result.data);
        resolve(answer.result.data);
      }
    });
  });
};


export const fetchStandbyDelegates = async () => {  
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      jsonrpc: '2.0',
      method: 'get.accounts',
      params: {status: "standby", limit: "30", offset: "0"} 
    }, answer => {
      if (answer.error) {
        reject(answer.error);
      } else {
        console.log(answer.result.data);
        resolve(answer.result.data);
      }
    });
  });
};



