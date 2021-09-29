import "antd/dist/antd.css";
import "./App.css";
import Header from "./components/Header";
import DelegatesTable from "./components/DelegatesTable";
import Statistics from "./components/Statistics";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import { statsRefreshRate } from "./config/config.json";
import { fetchForgerStats, fetchNodeInfo } from "./services/lisk";
import ReactTooltip from 'react-tooltip'

const App = () => {
  const [forgers, setForgers] = useState([]);
  const [nodeInfo, setNodeInfo] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(refreshStats, statsRefreshRate);
    refreshStats();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const refreshStats = async () => {
    const forgerStats = await fetchForgerStats();
    const nodeInfo = await fetchNodeInfo();

    setForgers(forgerStats.slice(0, 3));
    setNodeInfo(nodeInfo);
  };

  return (
    <div className="App">
      <div className="container">
        <Header nodeInfo={nodeInfo} />
       <Statistics forgers={forgers} nodeInfo={nodeInfo} />
	<DelegatesTable />
	      <div className="legend" ><br /><br />
		<img src="https://i.imgur.com/80BqSIy.png" alt="badges" />:<strong> Green Gem</strong> - This Delegate is actively forging. 
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

