import React, { useEffect, useState } from 'react'
import RoutersDom from './routers/RoutersDom'
import "bootstrap/dist/css/bootstrap.min.css";
import setAuthToken from './setAuthToken';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import AOS from "aos"



if(localStorage.getItem("token")){
  setAuthToken(localStorage.getItem("token"))
}

const App = () => {
  const [userlocal, setUserlocal] = useState({})
  const dispatch=useDispatch();


  const[navHeader,setnavheader]=useState(()=>{
    const savednavheader=localStorage.getItem("navHeader");
    return savednavheader ? JSON.parse(savednavheader):{};
  });

  useEffect(()=>{
    localStorage.setItem("navHeader",JSON.stringify(navHeader));
    console.log("App.js:updated navhedaer in localstorage",navHeader)
  },[navHeader]);


  //jwt token for decoding
  useEffect(()=>{
    const jwt=localStorage.getItem("token");
    try {
      const jwtuser=jwtDecode(jwt);
      if(Date.now() >=jwtuser.exp * 1000){
        localStorage.removeItem("token");
        localStorage.removeItem("navHeader")
        window.location.reload();
      }else{
        setUserlocal(jwtuser);
        dispatch(setUser(jwtuser));
      }
    } catch (error) {
      console.log("error decoding jwt:",error)
      
    }
  },[]);

  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <>
    <RoutersDom>
        
    </RoutersDom>
    </>
  )
}

export default App