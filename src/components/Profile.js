import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
    //code that gets the name of users based on their id
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/users/`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <ul>
                {
                    this.state.persons
                        .map(person =>
                            <li key={person.user_id}>{person.first_name} {person.last_name}</li>
                        )
                }
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