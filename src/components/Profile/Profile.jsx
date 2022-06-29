import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "./profile.css";

const Profile = () => {
    return (
        <div class="card">
            <div class="title">
                <h1> Profile Card </h1>
                <h2>John Doe</h2>
                <p class="title">Computer Science and Business</p>
                <p >Lehigh University</p>
                <a>
                    <p>LinkedIn</p>
                    <p>Instagram</p>
                </a>
                <p>Contact Information</p>
            </div>
        </div>

    );

};

export default Profile;

// //https://stackoverflow.com/questions/70689424/get-eth-balance-with-ethersjs
// //https://docs.ethers.io/v5/