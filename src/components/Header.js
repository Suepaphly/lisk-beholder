import React from "react";
import "./Header.css";

const Header = ({ nodeInfo }) => {
  return (
    <div>
     <p className="Header">
       Lisk Beholder (Mainnet) <br /> <p className="sub">(Lisk Core {nodeInfo?.networkVersion})</p>
       <img src="https://i.imgur.com/CywGOPZ.png" />
      </p>
    </div>
  );
};
export default Header;
