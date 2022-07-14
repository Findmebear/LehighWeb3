import axios from 'axios';
import React, { useState, useContext } from 'react';
import { TransactionContext } from "../../context/TransactionContext";

const url = 'http://localhost:3000/user';

const PostProfile = () => {
    const [firstName, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstName, email);
    };

    return (
        <section>
            <h2 className='text-center'>post request</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label htmlFor='name' className='form-label'>
                        name
                    </label>
                    <input
                        type='text'
                        className='form-input'
                        id='name'
                        value={firstName}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='email' className='form-label'>
                        email
                    </label>
                    <input
                        type='email'
                        className='form-input'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-block'>
                    login
                </button>
            </form>
        </section>
    );
};
export default PostProfile;