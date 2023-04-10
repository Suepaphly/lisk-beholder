import axios from "axios";

const nodeInfoMessge = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

const forgerStatsMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

const delegatesMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

const priceInfoMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "app:getNodeInfo",
  params: {}
});

const socket = new WebSocket('wss://service.lisk.com/rpc-v2');

export const fetchNodeInfo = async () => {
  const nodeInfoPromise = new Promise((resolve, reject) => {
    socket.onopen = function (evt) {
      socket.send(nodeInfoMessge);
    };
    socket.onmessage = function (evt) {
      const nodeInfoArray = JSON.parse(evt.data);
      resolve(nodeInfoArray);
    };
    socket.onerror = function (evt) {
      reject(evt);
    };
  });

  const nodeInfo = await nodeInfoPromise;
  console.log(nodeInfo);
  return nodeInfo;
};




export const fetchForgerStats = async () => {
  const forgerStatsPromise = new Promise((resolve, reject) => {
    socket.onopen = function (evt) {
      socket.send(forgerStatsMessage);
    };
    socket.onmessage = function (evt) {
      const forgerStatsArray = JSON.parse(evt.data);
      resolve(forgerStatsArray);
    };
    socket.onerror = function (evt) {
      reject(evt);
    };
  });

  const forgerStats = await forgerStatsPromise;
  console.log(forgerStats);
  return forgerStats;
};




export const fetchDelegates = async () => {
  const delegatesPromise = new Promise((resolve, reject) => {
    socket.onopen = function (evt) {
      socket.send(delegatesMessage);
    };
    socket.onmessage = function (evt) {
      const delegatesArray = JSON.parse(evt.data);
      resolve(delegatesArray);
    };
    socket.onerror = function (evt) {
      reject(evt);
    };
  });

  const delegates = await delegatesPromise;
  console.log(delegates);
  return delegates;
};




export const fetchPriceInfo = async () => {
  const priceInfoPromise = new Promise((resolve, reject) => {
    socket.onopen = function (evt) {
      socket.send(priceInfoMessage);
    };
    socket.onmessage = function (evt) {
      const priceInfoArray = JSON.parse(evt.data);
      resolve(priceInfoArray);
    };
    socket.onerror = function (evt) {
      reject(evt);
    };
  });

  const priceInfo = await priceInfoPromise;
  console.log(priceInfo);
  return priceInfo;
};

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
