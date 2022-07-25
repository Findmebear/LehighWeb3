import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Form } from 'react-router-dom';
import { TransactionContext } from "../../context/TransactionContext";
import "./profile.css";



const PostProfile = () => {
    const handleSubmit = async (e) => { 
        const fileInput = document.querySelector('input[type="file"]')
        // var FormData = require('form-data')
        // var imageData = new FormData();
        // imageData.append("file", fileInput[0])
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
            for (var i = 0; i <= data.length; i += 4){
              const avg = (data[i] + data[i+1] + data[i+2]) / 3
              data[i] = avg
              data[i + 1] = avg
              data[i + 2] = avg
            }
            context.putImageData(imageData, 0, 0)
            document.body.appendChild(img)

            canvas.toBlob(function (blob){
              const form = new FormData()
              form.append('image', blob, fileInput[0])
              const xhr = new XMLHttpRequest()
              xhr.open('GET', url)
              xhr.responseType = "arraybuffer"
              var result
              xhr.onload = function() {
                // result = ArrayBuffer
                result = new Uint8Array(xhr.response)
                if (xhr.status === 200) 
                  console.log(result);
              };
               xhr.send();
              //  xhr.open('POST', '/upload', true)
              //  xhr.send(result)
            })
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
    export default PostProfile;