import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Form } from 'react-router-dom';
import { TransactionContext } from "../../context/TransactionContext";



const UploadPic = () => {
    const handleSubmit = async (e) => { 
        const fileInput = document.querySelector('input[type="file"]')
        console.log(fileInput.files)
        const reader = new FileReader()
        reader.onload = function () {
          const img = new Image()
          img.onload = function () {
            const canvas = document.createElement('canvas')

            const context = canvas.getContext('2d')
            context.drawImage(img,0,0)

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data
            
            context.putImageData(imageData, 0, 0)
            document.body.appendChild(img)

            var base64String = canvas.toDataURL();
            var myBase64Data = base64String.split(',')[1];
            console.log(myBase64Data);
          }
          img.src = reader.result

        }
        var url = reader.readAsDataURL(fileInput.files[0])
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
    export default UploadPic;