import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { TransactionContext } from "../../context/TransactionContext";


const UpdateProf = () => {
    const [firstname, setName] = useState('');
    const [lastname, setLast] = useState('');
    const [descrip, setDescrip] = useState('');
    const { currentAccount, setUser } = useContext(TransactionContext);
    const id = currentAccount;

    function Update() {
        const postData = {
            user_id: currentAccount,
            first_name: firstname,
            last_name: lastname,
            description: descrip,
        };

        Axios
            .put(
                "http://localhost:3000/user/id",
                postData
            )
            .then((response) => {
                console.log(response);
            });
    }

    return (
        <div>
            <form onSubmit={Update}>
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
                    <label className='block'>Last Name: </label>
                    <textarea
                        value={lastname}
                        onChange={(e) => setLast(e.target.value)}
                        className='border border-gray-400 w-1/2 p-1'
                        placeholder='Please enter in your last name'
                    ></textarea>
                </div>

                <div className='mb-3'>
                    <label className='block'>Description:</label>
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
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};
export default UpdateProf;

//https://www.freecodecamp.org/news/how-to-use-axios-with-react/#how-to-make-a-put-request
//https://openjavascript.info/2022/05/03/using-axios-to-make-http-requests-get-post-put-delete/