import React from "react";
import "./Header.css";
//<p className="sub">(Lisk Core {nodeInfo?.networkVersion})</p>
const Header = ({ nodeInfo }) => {
  return (
    <div>
     <p className="Header">
       Lisk Beholder (Mainnet) <br /> 
       <img src="https://i.imgur.com/CywGOPZ.png" />
      </p>
    </div>
  );
};
export default Header;
