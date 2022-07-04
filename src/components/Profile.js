import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
    //code that gets the name of users based on their id
    state = {
        persons: []
    }

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
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
                            <li key={person.id}>{person.name}</li>
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

{/* <ul>
{this.state.userid.map(person => (
    <li key = {person.user_id}>{person.name}</li>
))}
</ul> */}