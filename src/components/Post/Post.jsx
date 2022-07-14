import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import "./post.css";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleChange(e, name)}
    />
  );

const Post = () => {
    const { createPost, postCount, handleChange } = useContext(TransactionContext);

    

    return (
        <div>
            <h1> Create a post! {postCount}</h1>
            <div class="row">
              <div class= "col-25">
              <label for="lFile">Video: </label>
              </div>
              <div class = "col-75">
              <Input placeholder="enter video" name= "video" type ="file" accept=".mp4, .mov, .mkv .ogg .wmv" handleChange= {()=> {}} />
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
          
            <button onClick={createPost}>Submit</button>
        </div>
    )
};
export default Post;