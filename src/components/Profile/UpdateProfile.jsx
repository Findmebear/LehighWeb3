import axios from 'axios';
import React, { useState, useContext } from 'react';
import { TransactionContext } from "../../context/TransactionContext";




const UpdateProfile = () => {
    const handleSubmit = async (e) => { 
        const fileInput = document.querySelector('input[type="file"]')
        var FormData = require('form-data')
        var imageData = new FormData();
        imageData.append("file", fileInput[0])
        console.log(fileInput.files);
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        try {
            const resFile = await axios.post(url, imageData,
            {
                headers: {
                    'pinata_api_key': `a3e45709eba1fe13a614`,
                    'pinata_secret_api_key': `bcbae387c4a66237a5492e22101c13493fe37f75d1ccf3bd780e4f22dda9b189`,
                    "Content-Type": `multipart/form-data`
                }
            }
            );
            console.log(`The Hash of the Image: ${resFile.data.IpfsHash}`);
            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

            const postToUserTable = await axios.post() //post the hash of the newly uploaded image to the image table
            
    
    
        } catch (error) {
            console.log("File to IPFS: ")
            console.log(error)
        }
    }
    return (
        <div>
          <h1> Upload a picture ! </h1>
          <div class="row">
            <div class= "col-25">
                <label for="lFile">Image: </label>
            </div>
            <div class = "col-75">
                <input type ="file" accept=".png, .jpeg, .mov" />
            </div>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )
    };
    export default UpdateProfile;