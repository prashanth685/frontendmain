import React from 'react'
import loginleft from './login_left.png'
import './Loginleft.css'

const Loginleft = () => {
  return (
    <>
    <div className="col-6 d-md-block d-none col-left">
        <div className="left_img_banner_container">
            <img src={loginleft} alt="login left img" style={{width:"100%",height:"100%"}} />
        </div>
    </div>
    </>
  )
}

export default Loginleft