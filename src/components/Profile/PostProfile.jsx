import axios from 'axios';
import React, { useState, useContext } from 'react';
import { TransactionContext } from "../../context/TransactionContext";


const PostProfile = () => {
    const [firstname, setName] = useState('');
    const [lastname, setLast] = useState('');
    const [descrip, setDescrip] = useState('');
    const { currentAccount, setUser } = useContext(TransactionContext);

    function onCreatePost(e) {
        e.preventDefault();
        const postData = {
            user_id: currentAccount,
            first_name: firstname,
            last_name: lastname,
            description: descrip,
        };

        axios
            .post(
                'http://localhost:3000/user',
                postData
            )
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <div>
            <h1 className='font-bold text-2xl'>Upload User Information</h1>
            <form onSubmit={onCreatePost}>
                <div className='mb-3'>
                    <label className='block'>User ID: </label>
                    <input
                        type='text'
                        value={currentAccount}
                        onChange={(e) => setUser(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your user id'
                    />
                </div>
                <div className='mb-3'>
                    <label className='block'>First Name: </label>
                    <textarea
                        value={firstname}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your first name'
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label className='block'>Last Name </label>
                    <textarea
                        value={lastname}
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
//https://github.com/john-smilga/axios-tutorial-react/blob/main/src/examples/3-post-request.
//https://stackoverflow.com/questions/69242963/how-to-make-an-axios-post-to-database