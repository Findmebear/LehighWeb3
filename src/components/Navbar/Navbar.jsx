import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import "./navbar.css";
import { Routes, Route, useNavigate } from 'react-router-dom';


const Navbar = () => {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const navigate = useNavigate();
  const { currentAccount, connectWallet } = useContext(TransactionContext);

  return (
    <div class="leftnav">
      <button onClick={() => navigate("/")}>WEB3 APP</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => navigate("/post")}>Post</button>
      <button onClick={() => navigate("/postProfile")}>PostProfile</button>
      <button onClick={() => navigate("/updatePic")}>UpdatePic</button>
      <button onClick={() => navigate("/updateProfile")}>UpdateProfile</button>


      <div class="rightnav">
        <button onClick={connectWallet}> {currentAccount}</button>
      </div>
    </div>
  );
};

export default Navbar;