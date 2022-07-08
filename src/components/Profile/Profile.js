import React from 'react';
import axios from 'axios';
import "./profile.css";

export default class Profile extends React.Component {

    //code that gets the name of users based on their id
    state = {
        persons: [],
    }

    componentDidMount() {
        axios.get("http://localhost:3000/user/id", {
            params: {
                id: "0x10a387cd1641775244cbc2ae2b48710dc80e4fab"
            }
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            })
    }

    render() {
        return (
            <ul>
                <div class="card" >
                    <p class="title">{
                        this.state.persons
                            .map(person =>
                                <li key={person.user_id}>{person.first_name} {person.last_name}</li>
                            )
                    } </p>

                </div>
            </ul>
        )
    }
}

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