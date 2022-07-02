import React, { useEffect, useState} from "react";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import "./post.css";

const Post = () => {
    const { createPost, postCount} = useContext(TransactionContext);

    return (
        <div>
            <h1> Create a post! {postCount}</h1>
            <form>
                <input type="file" name="upload" accept="image/*" />
                <input type="text" name="title" id="title" placeholder="Enter your title here" />
                <input type="text" name="text" id="text" placeholder="Enter your text here" />
            </form>
            <button onClick={createPost}>Submit</button>
        </div>
    )
};
export default Post;