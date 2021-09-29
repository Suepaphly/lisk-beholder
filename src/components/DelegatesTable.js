import React, { useState, useEffect } from "react";
import "./DelegatesTable.css";
import { delegatesRefreshRate } from "../config/config.json";
import { Table } from "antd";
import { Spin } from 'antd';
import { fetchDelegates } from "../services/lisk";
import starGreen from "../assets/starGreen.png";
import starRed from "../assets/starRed.png";
import ReactTooltip from 'react-tooltip';


const columns = [
  {
    key: "rank",
    title: "Rank",
    dataIndex: "rank",
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    key: "username",
    title: "Username",
    dataIndex: "username",
    sorter: (a, b) => {
      if (a.username < b.username) return -1;
      if (a.username > b.username) return 1;
      return 0;
    },
  },
  {     
    key: "address",
    title: "Address",
    dataIndex: "address",
    responsive: ["xxl"],
  },
  {
    key: "badges",
    title: "Badges",
    dataIndex: "badges",
    sorter: (a, b) => {
      if (a.badges <= b.badges) return -1;
      if (a.badges > b.badges) return 1;
      return 0;
    },
    defaultSortOrder: "descend", // 1 = EG, 2 = EV, 3 = BA, 4 = EV+EG, 5 = EV+BA, 6 = EV+EG, 7 = EV+EG+BA, 8 = UF+EG 
    render: value => 
      value == 1000 ? <span data-tip="Enhanced Gains - This Delegate excludes their self-vote which increases the voters rewards."><img src="https://i.imgur.com/rpA3i6t.png" /></span>
    : value == 2000 ? <span data-tip="Enhanced Value - Recognized for providing valuable contributions to the community." ><img src="https://i.imgur.com/exk720m.png" /></span>
    : value == 3000 ? <span data-tip="Bonus Airdrop - Voters of this delegate will earn sidechain tokens." ><img src="https://i.imgur.com/crfdMSC.png" /></span>
    : value == 4000 ? <span><span data-tip="Enhanced Value - Recognized for providing valuable contributions to the community." ><img src="https://i.imgur.com/exk720m.png" /></span><span data-tip="Enhanced Gains - This Delegate excludes their self-vote which increases the voters rewards."><img src="https://i.imgur.com/rpA3i6t.png" /></span></span>
    : value == 5000 ? <span><span data-tip="Enhanced Value - Recognized for providing valuable contributions to the community." ><img src="https://i.imgur.com/exk720m.png" /></span><span data-tip="Bonus Airdrop - Voters of this delegate will earn sidechain tokens." ><img src="https://i.imgur.com/crfdMSC.png" /></span></span>
    : value == 6000 ? <span><span data-tip="Enhanced Gains - This Delegate excludes their self-vote which increases the voters rewards."><img src="https://i.imgur.com/rpA3i6t.png" /></span><span data-tip="Bonus Airdrop - Voters of this delegate will earn sidechain tokens." ><img src="https://i.imgur.com/crfdMSC.png" /></span></span>
    : value == 7000 ? <span><span data-tip="Enhanced Value - Recognized for providing valuable contributions to the community." ><img src="https://i.imgur.com/exk720m.png" /></span><span data-tip="Enhanced Gains - This Delegate excludes their self-vote which increases the voters rewards."><img src="https://i.imgur.com/rpA3i6t.png" /></span><span data-tip="Bonus Airdrop - Voters of this delegate will earn sidechain tokens." ><img src="https://i.imgur.com/crfdMSC.png" /></span></span>
    : value == 8000 ? <span><span data-tip="Ultrafresh Powerup - Voting for this delegate provides Lisk with grassroots marketing and the development of NFTs and Gamefi."><img src="https://i.imgur.com/RhivWyY.gif" /></span><span data-tip="Enhanced Gains - This Delegate excludes their self-vote which increases the voters rewards."><img src="https://i.imgur.com/rpA3i6t.png" /></span></span>
    : null,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "consecutiveMissedBlocks",
    sorter: (a, b) => a.consecutiveMissedBlocks - b.consecutiveMissedBlocks,
    render: value =>
      value > 0 ? <img src="https://i.imgur.com/3SpsU2a.png" alt="status" /> : <img src="https://i.imgur.com/80BqSIy.png" alt="status" />,
  },
  {
    key: "producedBlocks",
    title: "Forged",
    dataIndex: "producedBlocks",
    sorter: (a, b) => a.producedBlocks - b.producedBlocks,
    render: value => `${value.toLocaleString("en")} Blocks`,
    responsive: ["xxl"],
  },
  {
    key: "totalVotesReceived",
    title: "Total Votes",
    dataIndex: "totalVotesReceived",
    sorter: (a, b) => a.totalVotesReceived - b.totalVotesReceived,
    render: value => `${value.toLocaleString("en")} LSK`,
    responsive: ["xl"],
  },
  {
    key: "voteWeight",
    title: "Effective Weight",
    dataIndex: "voteWeight",
    sorter: (a, b) => a.voteWeight - b.voteWeight,
    render: value => `${value.toLocaleString("en")} LSK`,
  },
  {
    key: "amount",
    title: "Self Vote",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
    render: value => `${value.toLocaleString("en")} LSK`,
    responsive: ["xl"],
  },
  {
    key: "voteCapacity",
    title: "Capacity",
    dataIndex: "voteCapacity",
    render: value => `${value.toLocaleString("en")}`,
    responsive: ["xl"],
  },
  {
    key: "sharePercent",
    title: "Share%",
    dataIndex: "sharePercent",
    sorter: (a, b) => a.sharePercent - b.sharePercent,
    render: value => `${value.toLocaleString("en")}%`,
  },
];

const buildTableData = delegates =>
  delegates.map(data => {
    const { address } = data.summary;
    const {
      rank,
      totalVotesReceived,
      voteWeight,
      producedBlocks,
      username,
    } = data.dpos.delegate;
    
    /*
    var standby = [];    
    standby["rank"] = "Standby";
    if(data.dpos.delegate.rank < 102){
      standby["rank"] = data.dpos.delegate.rank;
    }    
    const { rank } = standby;
    */
    
    
    
    var powerUsers = [{
"blainemono":   4000,
"ondin":        1000,
"przemer":      4000,
"ultrafresh":   8000,
"stellardynamic_vote": 5000,
"mrv":  4000,
"gr33ndrag0n":  2000,
"jeevanio_pool":   1000,
"gregorst":     1000,
"carbonara":    4000,
"shinekami":    1000,
"liskmagazine": 2000,
"liskjapan":    1000,
"liskearn":     1000,
"phinx":        1000,
"jump_pool":    1000,
"jesusthehun":  4000,
"lemii":        4000,
"korben3":      4000,
"moosty":       4000,
"minions":      1000,
"tonyt908":     2000,
"jong":         3000,
"hirish":       2000,
    }];

    var puser = data.dpos.delegate;

    var zerob = [];
    zerob["badges"] = 0;
    var barr = [];
    barr = zerob; 


    for (var key in powerUsers[0]) {    
      if(key == data.dpos.delegate.username){
        barr["badges"] = powerUsers[0][key];
        break;
      } else {


      }      
    }
    const { badges } = barr;        
    console.log(badges);
    
    for (let i = 0; i < data.dpos.sentVotes.length; i++) {
      var sorted = (data.dpos.sentVotes[i].delegateAddress == data.summary.address) ? data.dpos.sentVotes[i]
        : data.dpos.sentVotes[0];
    }    
    const { amount } = sorted;    
    
    
    var self = Number(sorted.amount / 10000000);
    var total = Number(data.dpos.delegate.totalVotesReceived / 100000000);
    var perc = total/(self);
    perc = perc*100;
    perc = perc.toFixed(0);
    perc = String(perc);
    perc += "%";    
    var cap = [];
    cap["voteCapacity"] = perc;    
    const { voteCapacity } = cap;
    
    var shareDelegates = [{
"liberspirita": 80,
"liskearn":     50,
"moosty":       20,
"private_pool": 70,
"shinekami":    70,
"benevale":     70,
"korben3":      20,
"liskroad":     60,
"devasive":     0,
"robinhood":    80,
"przemer":      60,
"samuray":      50,
"lemii":        20,
"spaceone_pool":        70,
"grumlin":      0,
"liskpool.top": 70,
"spirita":      80,
"spirita2":     80,
"vipertkd":     50,
"ultrafresh":   50,
"eastwind_ja":  50,
"mrgr": 30,
"jump_pool":    70,
"blainemono":   50,
"liskjapan":    50,
"mrv":  20,
"irina18":      70,
"cc001":        0,
"jong": 50,
"carbonara":    50,
"anamix":       50,
"liskcenter.io":        0,
"gr33ndrag0n":  0,
"loteria":      30,
"pool80percent":        80,
"jeevanio_pool":        75,
"jesusthehun":  25,
"corsaro":      0,
"phinx":        30,
"minions":      70,
"liskmagazine": 60,
"gregorst":     50,
"t3ran13":      0,
"goodWin80":    80,
"kc":   30,
"gong": 20,
"ondin":        0,
"savetheworld": 50,
"dav1": 0,
"lisk_nft":     70,
"ilgio":        50,
"eddedw":       0,
"hitman":       50,
      }];
    
    var zero = [];
    zero["sharePercent"] = 0;
    var share = [];
    share = zero;
    
    for (var key in shareDelegates[0]) {    
      if(key == data.dpos.delegate.username){
        share["sharePercent"] = shareDelegates[0][key];
        break;
      }      
    }
    const { sharePercent } = share;   

    return {
      key: rank,
      rank,
      username,
      badges,
      address,
      totalVotesReceived: Number(totalVotesReceived / 100000000),
      voteWeight: Number(voteWeight / 100000000),
      amount: Number(amount / 100000000),
      producedBlocks,
      voteCapacity,
      sharePercent,
    };
  });

const DelegatesTable = () => {
  const [delegates, setDelegates] = useState([]);
  
  useEffect(() => {
    const intervalId = setInterval(refreshDelegates, delegatesRefreshRate);
    refreshDelegates();

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  
  const refreshDelegates = async () => {
    
    var delegates = await fetchDelegates(0);
    var temp = await fetchDelegates(100);
    temp.forEach(element => delegates.push(element));
    setDelegates(delegates);
    ReactTooltip.rebuild();
  };
  
  return (
    <Table
      bordered={false}
      columns={columns}
      dataSource={buildTableData(delegates)}
      size={"small"}
      pagination={{ pageSize: delegates.length, hideOnSinglePage: true }}
      showSorterTooltip={false}
    />
  );
};

export default DelegatesTable;