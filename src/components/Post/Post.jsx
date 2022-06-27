import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "./post.css";
const Post = () => {

    return (
        <div>
            <h1> Create a post!</h1>
            <form>
                <input type="file" name="upload" accept="image/*" />
                <input type="text" name="title" id="title" placeholder="Enter your title here" />
                <input type="text" name="text" id="text" placeholder="Enter your text here" />
            </form>
            <button> Submit
            </button>
        </div>


    )

};
export default Post;