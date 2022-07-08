import React from 'react';
import axios from 'axios';
import "./profile.css";

export default class Profile extends React.Component {

    //code that gets the name of users based on their id
    state = {
        persons: [],
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users')
        .then(res => {
            const persons = res.data;
            this.setState({ persons })
            console.log(persons);
        })

        axios.get("http://localhost:3000/user/:user_id", {
            params:{
                user_id: "0xb68653b037f453a34fdf4a932493708e34ed7f80"
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