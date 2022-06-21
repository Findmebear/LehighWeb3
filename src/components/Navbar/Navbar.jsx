import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import "./navbar.css";


const Navbar = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async() => {
    try {
    /*
    * First make sure we have access to window.ethereum
    */
      const { ethereum } = window;
      setCurrentAccount("Sign In");
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
        } else {
          console.log("No authorized account found")
        }
      } catch  (error) {
        console.log(error);
  }
}


const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error)
  }
}



  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


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
