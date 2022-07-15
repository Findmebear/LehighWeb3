import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import "./post.css";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

require('dotenv').config()

console.log(process.env.PRIVATE_KEY)

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      step = "0.0001"
      type={type}
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

const Post = () => {
    const { createPost, postCount, handleChange, formData} = useContext(TransactionContext);

    const storage = new Web3Storage({ token: process.env.WEB3_STORAGE_API })

    const handleSubmit = async (e) => {
      console.log(__filename + "/../..") 
      const fileInput = document.querySelector('input[type="file"]')
      const {text, title} = formData;
      e.preventDefault();
      const videoHash = await storage.put(fileInput.files)
      console.log(`stored file with cid: ${videoHash}`)
      if (!videoHash || !text || !title) return;
      console.log("Text: " + text + "\nTitle: " + title)
      await createPost(videoHash);
    };

    return (
        <div>
            <h1> Create a post! {postCount}</h1>
            <input type ="file" accept=".mp4, .mov, .mkv .ogg .wmv" />
            <Input placeholder="Enter title" name="title" type="text" handleChange={handleChange} />
            <Input placeholder="Enter text" name="text" type="text" handleChange={handleChange} />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
};
export default Post;