import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { TransactionContext } from "../../context/TransactionContext";
import "./profile.css";

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
        <div class="card">

            <button onClick={getInfo} >User Information</button>
            <div class="title">
                {person}
            </div>

        </div>
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