import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import "./post.css";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

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
    const { createPost, getAllPosts, postCount, getPostCount, handleChange, formData} = useContext(TransactionContext);

    const storage = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGODhDQzg1QkNkYTAzNjAwOEEzYzgwM2FFNjVFMmFmZTczYjE4NTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTc4NDgzNjgzODAsIm5hbWUiOiJMZWhpZ2ggV2ViMyBQcm9qZWN0In0.-RIC2qhGDUsikakDIMV3p3GDr_tH_6NJWtKRbP9Mqlw" })

    const handleSubmit = async (e) => { 
      const fileInput = document.querySelector('input[type="file"]')
      const {text, title} = formData;
      e.preventDefault();
      const videoHash = await storage.put(fileInput.files)
      console.log(`stored file with cid: ${videoHash}`)
      if (!videoHash || !text || !title) return;
      console.log("Text: " + text + "\nTitle: " + title)
      await createPost(videoHash);
    };

    const DisplayAllPosts = async(e) => {
      //for loop to iterate through the array of Post struct from smart contract
      // console.log each instance (post) 

    }
    useEffect(() => {
      getPostCount()
      const posts = getAllPosts();
      console.log(posts)
    }, [postCount]);
    return (
      <div>
        <h1> Create a post! Total number of Posts: {postCount}</h1>
        <div class="row">
          <div class= "col-25">
          <label for="lFile">Video: </label>
          </div>
          <div class = "col-75">
          <input type ="file" accept=".mp4, .mov, .mkv .ogg .wmv" />
            </div>
        </div>
        <div class="row">
          <div class= "col-25">
          <label for="lTitle">Title: </label>
          
          </div>
          <div class = "col-75">
          <Input placeholder="Enter title" name="title" type="text" handleChange={handleChange} />
          </div>
        </div>
        <div class="row">
          <div class= "col-25">
          <label for="lText">Text: </label>
          </div>
          <div class = "col-75">
          <Input placeholder="Enter text" name="text" type="text" style="height:200px" handleChange={handleChange} />
            </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    )
};
export default Post;