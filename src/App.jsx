import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar/Navbar"
import Post from "./components/Post/Post"
const App = () => {
  return (

      <div>
        <Navbar />
        <Post/>
      </div>
      
    

  )
}

export default App