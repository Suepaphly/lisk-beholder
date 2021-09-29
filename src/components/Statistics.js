import React from "react";
import "./Statistics.css";

const Statistics = ({ forgers, nodeInfo }) => {
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
        </tbody>
      </table>
    </div>
  );
};
export default Statistics;
