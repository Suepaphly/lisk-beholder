import axios from "axios";

const request = async (method, params) => new Promise(resolve => {
    const socket = new WebSocket('ws://localhost:9901/ws');

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
    // Do something with forgerStats
    return forgerStats;
};

export const fetchNodeInfo = async () => {
    const nodeInfo = await request('get.network.status', {});
    // Do something with nodeInfo
    return nodeInfo;
};

export const fetchDelegates = async () => {
    const delegates = await request('get.blocks', { height: 123 });
    // Do something with delegates
    return delegates;
};

export const fetchPriceInfo = async () => {
    const priceInfo = await request('get.market.prices', {});
    // Do something with priceInfo
    return priceInfo;
};

export const fetchCGInfo = () =>
    axios
        .get("https://api.coingecko.com/api/v3/coins/lisk?localization=false&community_data=false&")
        .then(res => res.data)
        .catch(err => {
            console.error(err);
            return null;
        });
