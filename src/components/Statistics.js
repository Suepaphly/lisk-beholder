import React from "react";
import "./Statistics.css";

/*
  <td><strong> Height: </strong>{nodeInfo?.height || "N/A"} </td>           
*/

const Statistics = ({ forgers, price, marketCap, circSupply, totalVolume }) => {
  return (
    <div>
      <table className="statsTable">
        <tbody>         
          <tr>                       
            <td className="textAlignRight"><strong> Price: </strong> $ {Number(price).toFixed(2)} (from CoinGecko) </td>
          </tr>
          <tr>
              <td><strong> Circulating Supply: </strong> {Number(circSupply).toLocaleString("en")} LSK </td>
              <td className="textAlignRight"><strong> Total Market Cap: </strong> $ {Number(marketCap).toLocaleString("en")} </td>
          </tr>
          <tr>
            
            <td>
             <strong> Next Forgers: </strong> {" "}
              {forgers.map(
                (forger, i) => `${forger.username}${i !== forgers.length - 1 ? ", " : ""}`
              )}
            </td> 
              <td className="textAlignRight"><strong> Volume(24h): </strong> $ {Number(totalVolume).toLocaleString("en")} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
