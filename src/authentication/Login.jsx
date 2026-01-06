import React, { useEffect, useState } from 'react'
import LoginLeft from "./common/Loginleft"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import apiClient from '../api/apiClient'
import { setUserDetails } from '../redux/slices/UserDetailsSlice'
import './Login.css'


const Login = () => {
    const [count, setCount] = useState(1)
    const [loginerror, setLoginerror] = useState("")
    const navigate=useNavigate();
    const[role,setrole]=useState("")
    const dispatch=useDispatch();
    const [error,setError]=useState({
        email:"",
        password:"",
        role:""
    });

    const [data, setdata] = useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        if(loginerror?.length>0){
            setLoginerror("");
        }
        setError({
            email:"",
            password:"",
            role:""
        });
        setLoginerror("");
        const{name,value}=e.target;
        setdata({...data,[name]:value})
    };
    const handleRoleChange=(e)=>{
        setrole(e.target.value);
        setError({
            email:"",
            password:"",
            role:""
        });
        setLoginerror("")
    }
    useEffect(()=>{
        setError({
            email:"",
            password:""
        })
    },[count])

    const handleprev=()=>{
        if(count>1){
            setCount((prev)=>prev-1)
        }else{
            setCount(count)
        }
    };

    const handletoSubmit = (e)=>{
        if(e.key === "Enter"){
            handleSubmit();
        }
    };
    const handleSubmit=async()=>{
        if(data?.password?.length<8){
            setError({
                ...error,
                password:"Password must be at least 8 characters",
            })
        } else{
            try {
                const res=await apiClient.post(`/auth/${role}/login`,data)
                localStorage.setItem("token",res?.data?.token);
                dispatch(setUserDetails(res?.data));
                {
                    role === "admin" ? (window.location="/dashboard/dashboard"):(window.location="/allusers/dashboard")
                }
            } catch (error) {
                setLoginerror(error?.response?.data?.error || "Login failed")
            }
        }

    }





  return (
    <div className='row' id='login'>
        <LoginLeft/>
        <div className="col-12 col-md-6 login-right">
            <div className="two_step_form">
                <div className="login_dots_container">

                </div>
                <h2 className="text-center mb-4 signin_title">
                    Login
                </h2>
                <section className="form_fields_conatiner">
                    <>
                    <div className="login_inputConatiner">
                        <label htmlFor="email">email</label>
                        <input type="text" placeholder='enter your email' />
                        {}
                    </div>
                    <div className="login_inputContainer">
                        <label htmlFor="role">Role</label>
                        <select name="role" id="role">
                            <option value="">Select</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manger</option>
                            <option value="employee">user</option>
                        </select>
                        {}
                    </div>
                    </>
                    <>
                    <div className="login_inputContainer">
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder='enter your password'/>
                        {}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check"></div>
                        <div>
                            <a href="/forgotpassword">
                            Forgot Password?
                            </a>
                        </div>
                    </div>
                    </>
                    <button>
                        login
                    </button>
                </section>
                <hr className='mt-4'/>
                <div className="login_conatct_support">
                    <p>Have Any Problems?</p>
                    <span>contact support</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Login    