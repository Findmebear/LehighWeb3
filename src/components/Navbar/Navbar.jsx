import React, { useEffect, useState } from "react";
import { useContext } from "react";
import * as ReactDOM from "react-dom";
import { TransactionContext } from "../../context/TransactionContext";
import "./navbar.css";


const Navbar = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */

  const {currentAccount, connectWallet} = useContext(TransactionContext);


return (
  <div class="leftnav">
    <button > WEB3 App </button>
    <button >Profile</button>
   
    <div class = "rightnav">
      <button onClick={connectWallet}> {currentAccount}</button>
    </div>
    

  </div>
  );
};

export default Navbar;
