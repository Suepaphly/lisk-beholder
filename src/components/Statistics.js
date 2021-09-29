import React from "react";
import "./Statistics.css";

const Statistics = ({ forgers, nodeInfo, price, totalLocked, totalSupply }) => {
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
              <td><strong> Price: </strong> {price} </td>
              <td className="textAlignRight"><strong> Total Supply: </strong> {totalSupply} </td>
          </tr>
          <tr>
              <td><strong> Total Market Cap: </strong> {totalSupply*price} </td>
              <td className="textAlignRight"><strong> Total Locked: </strong> {totalLocked} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
