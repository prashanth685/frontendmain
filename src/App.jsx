import React, { useEffect, useState } from "react";
import RoutersDom from "./routers/RoutersDom";
import "bootstrap/dist/css/bootstrap.min.css";
import setAuthToken from "./setAuthToken";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

import AOS from "aos";
import { setUser } from "./redux/slices/UserSlice";
import { setLoading } from "./redux/slices/UniversalLoader";
import apiClient from "./api/apiClient";
import { Route } from "react-router-dom";
import Loader from "./users/loader/Loader";
import { useDispatch, useSelector } from "react-redux";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  const [userlocal, setUserlocal] = useState({});
  const { logoutToggle } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.UniversalLoader);

  const [navHeader, setnavheader] = useState(() => {
    const savednavheader = localStorage.getItem("navHeader");
    return savednavheader ? JSON.parse(savednavheader) : {};
  });

  useEffect(() => {
    localStorage.setItem("navHeader", JSON.stringify(navHeader));
    console.log("App.js:updated navhedaer in localstorage", navHeader);
  }, [navHeader]);

  //jwt token for decoding
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const jwtuser = jwtDecode(jwt);
      if (Date.now() >= jwtuser.exp * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("navHeader");
        window.location.reload();
      } else {
        setUserlocal(jwtuser);
        dispatch(setUser(jwtuser));
      }
    } catch (error) {
      console.log("error decoding jwt:", error);
    }
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="App">
        {loading && <Loader />}
        <RoutersDom></RoutersDom>
      </div>
    </>
  );
};

export default App;
