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
        <section className='bg-light'>
            <div class='container'>
                <div class='row'>
                    <h1 class='title'>My Profile</h1>
                    <div class='col-lg-12 mb-4 mb-sm05'>
                        <div class='card card-style1 border-0'>
                            <div class="row align-items-center">
                                <div class='col-lg-5 mb-4 mb-lg-0'>
                                    {/*DISPLAYS USER IMAGE*/}
                                    <img src={defaultPic} alt='default' borderRadius='50%' ></img>
                                </div>
                                <div class='col-lg-6 px-xl-10'>
                                    {/*EDIT PROFILE POP UP*/}
                                    <div class='editProfile'>
                                        <button onClick={togglePopup}>Edit Profile</button>
                                        {isOpen && <Popup
                                            content={<>
                                                <h1 className='popup-header'>Edit your profile</h1>
                                                <UpdateProf />
                                            </>}
                                            handleClose={togglePopup}
                                        />}
                                    </div>

                                    {/*DISPLAY USER INFO*/}
                                    <div class='bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded'>
                                        <h3 class='h2 text-white mb-0'> {first_name} {last_name} </h3>
                                    </div>
                                    <ul class='listed-unstyled mb-1-9'>
                                        <li class='mb-2 mb-xl-3 display-28'><span class='display-26 text-primary me-2 font-weight-600'>Wallet Address</span> {id}</li>
                                    </ul>
                                    <div class='col-lg-6 px-xl-10'>
                                        <div>
                                            <span class='section-title text-secondary mb-3 mb-sm-4'> About me:</span>
                                            <p class='text-secondary'> {description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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