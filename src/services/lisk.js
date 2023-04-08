import axios from "axios";

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
    const forgerStats = await request('get.forgers', {});
    const forgerStatsArray = JSON.parse(forgerStats);
    console.log(forgerStatsArray);
    return forgerStatsArray;
};

export const fetchNodeInfo = async () => {
    const nodeInfo = await request('{"jsonrpc":"2.0","id":1,"method":"app:getNodeInfo","params":{}}');
    
    const nodeInfoArray = JSON.parse(nodeInfo);
    console.log(nodeInfoArray);
    return nodeInfoArray;
};

export const fetchDelegates = async () => {
    const delegates = await request('get.blocks', { height: 123 });
    
    const delegatesArray = JSON.parse(delegates);
    console.log(delegatesArray);
    return delegatesArray;
};

export const fetchPriceInfo = async () => {
    const priceInfo = await request('get.market.prices', {});
    
    const priceInfoArray = JSON.parse(priceInfo);    
    console.log(priceInfoArray);
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
