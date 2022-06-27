import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar"
//import { Route, Switch } from "react-router-dom";
import Post from "./components/Post/Post";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
        <Route path="/post" element={<Post />} />
      </Routes>
      {/* <Post/> */}
    </div>



  )
}

export default App