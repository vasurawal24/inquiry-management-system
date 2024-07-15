import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { check } from "./Store/Counterslice/CounterSlice";


function Login() {
    const dish = useDispatch();
    const [adname, setname] = useState('');
    const [password, setpassword] = useState('');
    const [error, setError] = useState('');
    const [Log, setlog] = useState('');
    const [token, settoken] = useState('');

    let navigate = useNavigate();
    const log = async () => {
        try {
            const response = await axios.post('/admin_login', {
                name: adname,
                password: password
            });
            if (response.data.name) {
                localStorage.setItem('name', response.data.name[0].name);
                localStorage.setItem('email', response.data.name[0].email);
                localStorage.setItem('image', response.data.name[0].image);
                // console.log("name", response.data.name[0].name);
                // console.log("email", response.data.name[0].email);
                // console.log("image", response.data.name[0].image);
            }
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dish(check());
                settoken(response.data.token);
                navigate('/Dashboard');
            }
            if (response.data.status) {
                console.log(response.data.status);
                setError(response.data.status);
            }
        } catch (error) {
            console.log("error =", error);
        }
    }
    const logout = async () => {
        try {
            const second = await axios.get('/admin_logout');
            console.log(second.data);
            if (second.data) {
                navigate('/');
            }
            if (second.data.status) {
                setlog(second.data.status);
            }
        } catch (error) {
            console.log("error =", error);
        }
    }
    return (
        <>
            <div className="sec-1">
                <div style={{ position: "absolute", height: "100vh", width: "100vw", overflow: "hidden" }}>
                </div>
                <div className="login-card">
                    <div className="text">
                        <h1>
                            <em>Welcome TO INQUIRY</em>
                        </h1>
                    </div>
                    <div className="user-ipt">
                        <input type="text" name="usename" id="username" placeholder="Username" onChange={(e) => { setname(e.target.value) }} />
                        <input type="password" name="password" placeholder="password" onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    {
                        error ? <p style={{ color: "red" }}>{error}</p> : ''
                    }
                    <div className="login-btn">
                        <a><button onClick={log}>login</button></a>
                         {/* <Link to="/"><button onClick={logout} className="mt-1">logout</button></Link>  */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;