import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from "../authentication/Login"
import ContactSupport from '../authentication/ContactSupport'


const RoutersDom = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/contactSupoort' element={<ContactSupport/>}/>
    </Routes>
    </>
  )
}

export default RoutersDom