import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar"
//import { Route, Switch } from "react-router-dom";
import Post from "./components/Post/Post";
import Profile from "./components/Profile/Profile.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostProf from "./components/Profile/PostProfile";
import UpdateProf from "./components/Profile/UpdateProfile";


const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postProfile" element={<PostProf />}/>
        <Route path="/updateProfile" element={<UpdateProf />}/>
      </Routes>
      {/* <Post/> */}
    </div>

  )
}

export default App