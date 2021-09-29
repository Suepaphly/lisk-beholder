import React from "react";
import "./Statistics.css";

const Statistics = ({ forgers, nodeInfo, price, marketCap, circSupply, totalVolume }) => {
  return (
    <div>
      <table className="statsTable">
        <tbody>
          <tr>
            <td><strong> Height: </strong>{nodeInfo?.height || "N/A"} </td>
            <td className="textAlignRight">
             <strong> Next Forgers: </strong> {" "}
              {forgers.map(
                (forger, i) => `${forger.username}${i !== forgers.length - 1 ? ", " : ""}`
              )}
            </td>            
          </tr>
          <tr>
              <td><strong> Price: </strong> $ {Number(price).toFixed(2)} USD (from Kraken) </td>
              <td className="textAlignRight"><strong> Circulating Supply: </strong> {Number(circSupply).toLocaleString("en")} LSK </td>
          </tr>
          <tr>
              <td><strong> Total Market Cap: </strong> {marketCap} </td>
              <td className="textAlignRight"><strong> Volume(24h): </strong> $ {Number(totalVolume).toLocaleString("en")} USD </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
