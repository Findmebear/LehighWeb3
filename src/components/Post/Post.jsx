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
            <Input placeholder="enter video" name= "video" type ="file" accept=".mp4, .mov, .mkv .ogg .wmv" handleChange= {()=> {}} />
            <Input placeholder="Enter title" name="title" type="text" handleChange={handleChange} />
            <Input placeholder="Enter text" name="text" type="text" handleChange={handleChange} />

            <button onClick={createPost}>Submit</button>
        </div>
    )
};
export default Post;