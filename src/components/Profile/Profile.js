import React, { useState } from 'react';
import Axios from 'axios';
import "./profile.css";

function Profile() {
    const [person, setPerson] = useState("");

    const getInfo = () => {
        fetch('http://localhost:3000/users/0x10a387cd1641775244cbc2ae2b48710dc80e4fab')
            .then((response) => response.json())
            .then((data) => {
                setPerson(data.first_name + " " + data.last_name +
                "\n" + data.description + " " + data.user_id);
            });

    };
    return (
        <div class="card">

            <button onClick={getInfo}>User Information</button>
            <div class="title">
                {person}
            </div>

        </div>
    );
}
export default Profile;

// import React from 'react';
// import axios from 'axios';
// import "./profile.css";

// export default class Profile extends React.Component {

//     //code that gets the name of users based on their id
//     state = {
//         persons: [],
//     }

//     componentDidMount() {
//         axios.get('http://localhost:3000/users', {
//             param: {
//                 "user_id": "0x10a387cd1641775244cbc2ae2b48710dc80e4fab"
//             }
//         })
//             .then(res => {
//                 const persons = res.data;
//                 this.setState({ persons })
//                 console.log(persons.user_id);
//             })
//     }

//     render() {
//         return (
//             <ul>
//                 {
//                     <div class="card" >
//                         <p class="title">{
//                             this.state.persons
//                                 .map(person =>
//                                     <li key={person.user_id}>{person.first_name} {person.last_name}</li>
//                                 )
//                         } </p>

//                     </div>
//                 }
//             </ul>
//         )
//     }
// }

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