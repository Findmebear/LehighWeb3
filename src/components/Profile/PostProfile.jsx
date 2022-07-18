import axios from 'axios';
import React, { useState, useContext } from 'react';
import { TransactionContext } from "../../context/TransactionContext";


const PostProfile = () => {
    const [firstName, setName] = useState('');
    const [lastName, setLast] = useState('');
    const [ userId, setUser ] = useState('');
    const [descrip, setDescrip] = useState('');

    function onCreatePost(e) {
        e.preventDefault();
        const postData = {
            userId,
            firstName,
            lastName,
            descrip,
        };

        axios
            .post(
                'http://localhost:3000/user',
                postData,
            )
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Create Post</h1>
            <form onSubmit={onCreatePost}>
                <div className='mb-3'>
                    <label className='block'>User ID: </label>
                    <input
                        type='text'
                        value={userId}
                        onChange={(e) => setUser(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your user id'
                    />
                </div>
                <div className='mb-3'>
                    <label className='block'>First Name: </label>
                    <textarea
                        value={firstName}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your first name'
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label className='block'>Last Name </label>
                    <textarea
                        value={lastName}
                        onChange={(e) => setLast(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your last name'
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label className='block'>Description</label>
                    <textarea
                        value={descrip}
                        onChange={(e) => setDescrip(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in a description'
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <button
                        type='submit'
                        className='bg-purple-500 text-white px-3 py-1'
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );

};
export default PostProfile;


//https://stackoverflow.com/questions/69242963/how-to-make-an-axios-post-to-database
//https://www.youtube.com/watch?v=hdzDoRuq4C0
//https://www.youtube.com/watch?v=hdzDoRuq4C0