import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { TransactionContext } from "../../context/TransactionContext";
import "./profile.css";
import "./Popup.css";
import Popup from './Popup';
import defaultPic from "../Profile/defaultPic.jpeg";
import UpdateProf from './UpdateProf';


const Profile = () => {
    //Edit Profile Popup
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    //Display User Info
    const { currentAccount } = useContext(TransactionContext);
    const [first_name, setFirstName] = useState([])
    const [last_name, setLastName] = useState([])
    const [description, setDescription] = useState([])

    //State
    const id = currentAccount;
    console.log("currentAccount - " + currentAccount);
    const fetchData = () => {
        if (currentAccount != "Sign In") {
            fetch("http://localhost:3000/users/" + currentAccount)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setDescription(data.description)
                })
        }
    }
    useEffect(() => {
        fetchData()
    }, [currentAccount]);

    return (
        <section className='section_body'>
            <div class = 'wrapper'>
                <div class='container'>
                    {/* HEADER */}
                    <h1 class='title'> My Profile</h1>
                    {/* USER CARD */}
                    <div class='card'>
                        <img class='card__image' src={defaultPic} alt="profilePic" />
                        <h2 class='user_name'> {first_name} {last_name}</h2>
                        <p class='user_bio'> {description}</p>
                        <div class='edit_profile'>
                            <button type='submit' class='btn btn-primary' onClick={togglePopup}>Edit Profile</button>
                            {isOpen && <Popup
                                content={<>
                                    <h3 className='popup-header'>Edit your Profile</h3>
                                    <UpdateProf />
                                </>}
                                handleClose={togglePopup}
                            />}
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
};
export default Profile;

//https://jsonplaceholder.typicode.com/users
//https://stackoverflow.com/questions/64312119/send-axios-api-requests-from-react-app-deployed-on-heroku
//https://elements.heroku.com/buildpacks/axios/axios
//https://www.youtube.com/watch?v=oQnojIyTXb8
//https://www.digitalocean.com/community/tutorials/react-axios-react


//https://www.codingdeft.com/posts/react-fetch-data-api/
//https://www.youtube.com/watch?v=rpg1jOvGCtQ