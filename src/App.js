import "antd/dist/antd.css";
import "./App.css";
import Header from "./components/Header";
import DelegatesTable from "./components/DelegatesTable";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import { statsRefreshRate } from "./config/config.json";
import { fetchForgerStats, fetchNodeInfo, fetchCGInfo } from "./services/lisk";
import ReactTooltip from 'react-tooltip'

const App = () => {
  const [forgers, setForgers] = useState([]);
  //const [nodeInfo, setNodeInfo] = useState(null);
  const [price, setPrice] = useState(null);
  const [cgi, setCGI] = useState(null);
  const [marketCap, setmarketCap] = useState(null);
  const [circSupply, setcircSupply] = useState(null);
  const [totalVolume, settotalVolume] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(refreshStats, statsRefreshRate);
    refreshStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshStats = async () => {
    const forgerStats = await fetchForgerStats();
    const cgi = await fetchCGInfo();
    const price = cgi.market_data.current_price.usd;
    const marketCap = cgi.market_data.market_cap.usd;
    const circSupply = cgi.market_data.circulating_supply;
    const totalVolume = cgi.market_data.total_volume.usd;
    //const nodeInfo = await fetchNodeInfo();
    

    setForgers(forgerStats);
    //console.log(nodeInfo);
    //setNodeInfo(nodeInfo);
    setPrice(price);
    setmarketCap(marketCap);
    setcircSupply(circSupply);
    settotalVolume(totalVolume);
  };
  
  /*  
  <Header nodeInfo={nodeInfo} />
  <Statistics forgers={forgers} nodeInfo={nodeInfo} price={price} marketCap={marketCap} circSupply={circSupply} totalVolume={totalVolume} />
  */


  return (
    <div className="App">
      <div className="container">
        <Header />
        <Statistics forgers={forgers} price={price} marketCap={marketCap} circSupply={circSupply} totalVolume={totalVolume} />
	<DelegatesTable />
	      <div className="legend" ><br /><br />
		<img src="https://i.imgur.com/80BqSIy.png" alt="badges" />:<strong> Green Gem</strong> - This Delegate is actively forging. 
    		<br />
		<img src="https://i.imgur.com/3SpsU2a.png" alt="badges" />:<strong> Red Gem</strong> - This Delegate is not actively forging. 
    		<br />
		<img src="https://i.imgur.com/6K5rnE7.png" alt="badges" />:<strong> Green Drake</strong> - Awarded for the creation of dragon wizardry which supports other Lisk delegates.
		<br />
		<img src="https://i.imgur.com/iXCzQH5.gif" alt="badges" />:<strong> Tool Master</strong> - Active developer of sidechains and tools on the Lisk blockchain.
		<br />
                <img src="https://i.imgur.com/rpA3i6t.png" alt="badges" />:<strong> Enhanced Gains </strong> - This Delegate excludes their self-vote which increases the voters rewards.
                <br /> 
                <img src="https://i.imgur.com/exk720m.png" alt="badges" />:<strong> Enhanced Value</strong> - Recognized for providing valuable contributions to the community.
                <br />
                <img src="https://i.imgur.com/crfdMSC.png" alt="badges" />:<strong> Bonus Airdrop</strong> - Voters of this delegate will earn sidechain tokens.
                <br />
                <img src="https://i.imgur.com/RhivWyY.gif" alt="badges" />:<strong> Ultrafresh Powerup</strong> - Voting for this delegate provides Lisk with grassroots marketing and the development of NFTs and Gamefi.
        </div><br /><br />
	<ReactTooltip />
        <Footer />
      </div>
    </div>
  );
};

export default App;


