import axios from "axios";
import io from 'socket.io-client';

const SERVICE_RPC_ENDPOINT = 'wss://service.lisk.com/rpc-v2';
const NODE_RPC_ENDPOINT = 'wss://api.lisknode.io/ws';

const socket = io(SERVICE_RPC_ENDPOINT, {
  forceNew: true,
  transports: ['websocket']
});

const socketNode = io(NODE_RPC_ENDPOINT, {
  forceNew: true,
  transports: ['websocket']
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

export const fetchNodeInfo = async () => {
  return new Promise((resolve, reject) => {
    socketNode.emit('request', {
      jsonrpc: '2.0',
      method: 'app:getNodeInfo',
      params: {} 
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

export const fetchForgerStats = async () => {  
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      jsonrpc: '2.0',
      method: 'get.forgers',
      params: {limit: "3", offset: "0"} 
    }, answer => {
      if (answer.error) {
        reject(answer.error);
      } else {
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
        resolve(answer.result.data);
      }
    });
  });
};



