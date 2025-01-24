import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower__container}>
      <div>
        <ul>
          <li>
            <AiOutlineMenu />
            ALL
          </li>
          <li>Today's Deals</li>
          <li>Custumer Service</li>
          <li>Registery</li>
          <li>GiftCards</li>
          <li>Sell</li>
        </ul>
      </div>
    </div>
  );
}

export default LowerHeader;
