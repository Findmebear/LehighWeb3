import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { TransactionContext } from "../../context/TransactionContext";
import "./profile.css";
import defaultPic from "../Profile/defaultPic.jpeg";

function Profile() {
    const [person, setPerson] = useState("");
    const { currentAccount } = useContext(TransactionContext);
    //const id = prompt("Enter your user_id: ");

    const getInfo = () => {
        //const id = currentAccount;
        const id = "0x10a387cd1641775244cbc2ae2b48710dc80e4fab";
        Axios.get('http://localhost:3000/users/' + id).then(
            (response) => {
                //console.log(id)
                setPerson(response.data.first_name + " " + response.data.last_name +
                    "\n" + response.data.description);
            }
        );

    };
    return (
        <section className='bg-light'>
            <div class = 'container'>
                <div class = 'row'>
                    <div class = 'col-lg-12 mb-4 mb-sm05'>
                        <div class = 'card card-style1 border-0'>
                            <div class = "row align-items-center">
                                <div class = 'col-lg-6 mb-4 mb-lg-0'>
                                    <img src = {defaultPic} alt = 'default'></img>
                                </div>
                                <div class = 'col-lg-6 px-xl-10'>
                                    <div class = 'bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded'>
                                        <h3 class = 'h2 text-white mb-0'> Sample User </h3>
                                        <span class = 'text-primary'> @sampleUser </span>
                                    </div>
                                    <ul class = 'listed-unstyled mb-1-9'>
                                        <li class = 'mb-2 mb-xl-3 display-28'><span class= 'display-26 text-primary me-2 font-weight-600'>Wallet Address: </span> sample address</li>
                                        <li class = 'mb-2 mb-xl-3 display-28'><span class= 'display-26 text-primary me-2 font-weight-600'>Email: </span> sample email</li>
                                    </ul>
                                    <ul class = "social-icon-style1 list-unstyled mb-0 ps-0">
                                        <li><a href='#!'><i class = "ti-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = 'col-lg-12 mb-4 mb-sm-5'>
                    <div>
                        <span class = 'section-title text-secondary mb-3 mb-sm-4'> About me:</span>
                        <p class = 'text-secondary'> Add a bio...</p>
                    </div>
                </div>
            </div>
        </section>
       
        // <div class="card">

        //     <button onClick={getInfo} >User Information</button>
        //     <div class="title">
        //         {person}
        //     </div>

        // </div>
    );
}
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


//https://www.youtube.com/watch?v=rpg1jOvGCtQ