import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import  Signup  from "./components/signup.jsx"
import Signin from "./components/signin.jsx"
import Dashboard from "./components/dashboard.jsx"
import Send from "./components/transfer.jsx"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      
      
      <Route path="/signin" element = {<Signin/>}/>
        <Route path="/signup" element = {<Signup/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/send" element = {<Send/>}/>
      

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
