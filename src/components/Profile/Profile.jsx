import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { TransactionContext } from "../../context/TransactionContext";
import "./profile.css";
import defaultPic from "../Profile/defaultPic.jpeg";

const Profile = () => {

    //State
    const { currentAccount } = useContext(TransactionContext);
    const [first_name, setFirstName] = useState([])
    const [last_name, setLastName] = useState([])
    const [description, setDescription] = useState([])
    const id = "0xc9220c6683389fa251832853270f9f2436464707"
    console.log("currentAccount - " + currentAccount);
    console.log("id - " + id);
    const fetchData = () => {
        fetch("http://localhost:3000/users/" + id)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setDescription(data.description)
            })
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <section className='bg-light'>
            <div class='container'>
                <div class='row'>
                    <h1 class='title'>Profile Page</h1>
                    <div class='col-lg-12 mb-4 mb-sm05'>
                        <div class='card card-style1 border-0'>
                            <div class="row align-items-center">
                                <div class='col-lg-6 mb-4 mb-lg-0'>
                                    <img src={defaultPic} alt='default'></img>
                                </div>
                                <div class='col-lg-6 px-xl-10'>
                                    <div class='editProfile'>
                                        <a href="/postProfile" >
                                            <button>Edit Profile</button>
                                        </a>
                                    </div>
                                    <div class='bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded'>
                                        <h3 class='h2 text-white mb-0'> {first_name} {last_name} </h3>
                                        <span class='text-primary'> @sampleUser</span>
                                    </div>
                                    <ul class='listed-unstyled mb-1-9'>
                                        <li class='mb-2 mb-xl-3 display-28'><span class='display-26 text-primary me-2 font-weight-600'>Wallet Address: </span> sample address</li>
                                        <li class='mb-2 mb-xl-3 display-28'><span class='display-26 text-primary me-2 font-weight-600'>Email: </span> sample email</li>
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

{/* <ul>
{this.state.userid.map(person => (
    <li key = {person.user_id}>{person.name}</li>
))}
</ul> */}

//https://www.codingdeft.com/posts/react-fetch-data-api/
//https://www.youtube.com/watch?v=rpg1jOvGCtQ