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




/*
const nodeInfoMessage = JSON.stringify({
  jsonrpc:"2.0",
  id:1,
  method:"app:getNodeInfo",
  params:{}
});

const nodeSocket = new WebSocket('wss://api.lisknode.io/ws');

export const fetchNodeInfo = async () => {
  return new Promise((resolve, reject) => {
    nodeSocket.onopen = function (evt) {
      nodeSocket.send(nodeInfoMessage);
    };
    nodeSocket.onmessage = function (evt) {
      const nodeInfoArray = JSON.parse(evt.data, undefined, 4);
      if (nodeInfoArray.id == "1") {   
        
        console.log(nodeInfoArray);
        nodeSocket.close(0);
        resolve(nodeInfoArray);

      }
    };
    nodeSocket.onerror = function (evt) {
      reject(evt);
    };
  });
};
*/