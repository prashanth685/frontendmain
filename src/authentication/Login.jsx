import React, { useEffect, useState } from "react";
import LoginLeft from "./common/Loginleft";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiClient from "../api/apiClient";
import { setUserDetails } from "../redux/slices/UserDetailsSlice";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [count, setCount] = useState(1);
  const [loginerror, setLoginerror] = useState("");
  const navigate = useNavigate();
  const [role, setrole] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    if (loginerror?.length > 0) {
      setLoginerror("");
    }
    setError({
      email: "",
      password: "",
      role: "",
    });
    setLoginerror("");
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const handleRoleChange = (e) => {
    setrole(e.target.value);
    setError({
      email: "",
      password: "",
      role: "",
    });
    setLoginerror("");
  };
  useEffect(() => {
    setError({
      email: "",
      password: "",
    });
  }, [count]);

  const handleprev = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    } else {
      setCount(count);
    }
  };

  const handleSubmit = async () => {
    let errors = {
      email: "",
      password: "",
      role: "",
    };

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!role) {
      errors.role = "Please select a role";
    }

    if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    setError(errors);

    // stop submission if any error exists
    if (errors.email || errors.password || errors.role) return;

    try {
      const res = await apiClient.post(`/auth/${role}/login`, data);
      localStorage.setItem("token", res.data.token);
      dispatch(setUserDetails(res.data));

      role === "admin"
        ? (window.location = "/dashboard/dashboard")
        : (window.location = "/allusers/dashboard");
    } catch (err) {
      setLoginerror(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="row" id="login">
      <LoginLeft />
      <div className="col-12 col-md-6 login_right">
        <div className="two_step_form">
          <div className="login_dots_container"></div>
          <h2 className="text-center mb-4 signin_title">Login</h2>
          <section className="form_fields_conatiner">
            <>
              <div className="login_inputContainer">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={data.email}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {error?.email?.length > 0 && (
                  <em className="error">{error.email}</em>
                )}
              </div>
              <div className="login_inputContainer">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">User</option>
                </select>
                {error?.role && <em className="error">{error.role}</em>}
              </div>

              <div className="login_inputContainer">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {error?.password && <em className="error">{error.password}</em>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check"></div>
                <div>
                  <a
                    href="/forgotpassword"
                    style={{ textDecoration: "none", color: "#345053" }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </>
            <button
              className="sign"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              login
            </button>
          </section>
          <hr className="mt-4" />
          <div className="login_contact_support">
            <p>
              Have Any Problems?
              <span
                className="contact_support_link"
                onClick={() => navigate("/contactSupoort")}
              >
                contact support
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
