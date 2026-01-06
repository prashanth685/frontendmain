import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from "../authentication/Login"


const RoutersDom = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default RoutersDom