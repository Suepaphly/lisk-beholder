import axios from "axios";
import io from 'socket.io-client';

const WS_RPC_ENDPOINT = 'wss://service.lisk.com/rpc-v2';

const socket = io(WS_RPC_ENDPOINT, {
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

const nodeSocket = new WebSocket('wss://api.lisknode.io/ws');

const nodeInfoMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

export const fetchNodeInfo = async () => {
  const nodeInfoPromise = new Promise((resolve, reject) => {
    nodeSocket.onopen = function (evt) {
      nodeSocket.send(nodeInfoMessage);
    };
    nodeSocket.onmessage = function (evt) {
      try {
        const nodeInfo = JSON.parse(evt.data);
        if (nodeInfo.result) {
          console.log(nodeInfo.result);
          resolve(nodeInfo.result);
        } else if (nodeInfo.error) {
          reject(nodeInfo.error);
        }
        nodeSocket.close();
      } catch (error) {
        reject(error);
      }
    };
    nodeSocket.onerror = function (evt) {
      reject(evt);
    };
  });
  const nodeInfo = await nodeInfoPromise;
  return nodeInfo;
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


export const fetchDelegates = async (status, limit, offset) => {
  return new Promise((resolve, reject) => {
    socket.emit('request', {
      jsonrpc: '2.0',
      method: 'get.accounts',
      params: {status, limit, offset} 
    }, answer => {
      if (answer.error) {
        reject(answer.error);
      } else {
        resolve(answer.result.data);
      }
    });
  });
};




