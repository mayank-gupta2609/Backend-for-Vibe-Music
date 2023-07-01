import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setUserName, setUseremail, setAuthtoken, setLoggedIn, setPlaylist } from '../redux/features/userSlice';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [signin, setSignin] = useState({ name: "", email: "", password: "" })
    const { playlists,user_id } = useSelector((state) => state.user) 

    let token = "";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resposnse = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await resposnse.json();
        console.log(json)
        if (json.success) {
            token = json.authtoken;
            localStorage.setItem('authtoken', token);
            dispatch(setUserId(json.uid))
            dispatch(setPlaylist(json.playlist___))
            dispatch(setUserName(json.uname))
            dispatch(setUseremail(json.email))
            dispatch(setAuthtoken(token))
            dispatch(setLoggedIn(true));
            console.log(playlists)
            navigate("/home")

        }
        else {
            alert("Invalid credentials");
        }
    }


    const handleSubmit_ = async (e) => {
        e.preventDefault();
        const resposnse = await fetch("http://localhost:5000/api/auth/adduser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:signin.name,  email: signin.email, password: signin.password })
        });

        const json = await resposnse.json();
        console.log(json)
        let uid 
        if (json.authtoken) {
            token = json.authtoken;
            localStorage.setItem('authtoken', token);
            uid = json.user._id;
            dispatch(setUserId(uid))
            dispatch(setPlaylist([]))
            dispatch(setUserName(json.user.name))
            dispatch(setUseremail(json.email))
            dispatch(setAuthtoken(token))
            dispatch(setLoggedIn(true));
            console.log(json.user._id)
        }
        
        
        navigate("/home")
           
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onChange_ = (e) => {
        setSignin({ ...signin, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="container d-flex mt-5" style={{ width: '100vw', height: '90vh'}}>

                <div className="login text-center" style={{ width: '50%' }}>

                    <div className="text-center">

                        <h1>Sign Up!</h1>

                        <div className="mb-3 mt-5">
                            <img src="https://imgflip.com/s/meme/Doge.jpg" alt="" style={{ width: '150px', borderRadius: '75px' }} />
                        </div>


                        <div className="d-flex align-items-center justify-content-center" style={{ width: '100%' }} >

                            <div style={{ width: '40%' }}  >
                                <form onSubmit={handleSubmit_} autoComplete="off">
                                    <div className="form-group text-center">
                                        <label htmlFor="name" style={{ color: 'white' }} className="form-label ">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Enter Name" value={signin.name} onChange={onChange_} name="name" />
                                    </div>
                                    <div className="form-group text-center">
                                        <label htmlFor="email" style={{ color: 'white' }} className="form-label ">E-mail address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={signin.email} onChange={onChange_} name="email" />
                                    </div>
                                    <div className="form-group text-center mt-2 mb-2">
                                        <label htmlFor="password" style={{ color: 'white' }} className="form-label">Password</label>
                                        <input type="password" className="form-control" value={signin.password} onChange={onChange_} id="password" placeholder="Password" name="password" />
                                    </div>
                                    <div className='text-center mt-3'>
                                        <button type="submit" className="btn btn-primary">Login!</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="d-flex align-items-center ">
                    <h1>
                        OR
                    </h1>
                </div>
                <div className="login text-center" style={{ width: '50%' }}>

                    <div className="text-center">

                        <h1>Login!</h1>

                        <div className="mb-3 mt-5">
                            <img src="https://imgflip.com/s/meme/Doge.jpg" alt="" style={{ width: '150px', borderRadius: '75px' }} />
                        </div>


                        <div className="d-flex align-items-center justify-content-center" style={{ width: '100%' }} >

                            <div style={{ width: '40%' }}  >
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="form-group text-center">
                                        <label htmlFor="email" style={{ color: 'white' }} className="form-label ">E-mail address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} name="email" />
                                    </div>
                                    <div className="form-group text-center mt-2 mb-2">
                                        <label htmlFor="password" style={{ color: 'white' }} className="form-label">Password</label>
                                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" placeholder="Password" name="password" />
                                    </div>
                                    <div className='text-center mt-3'>
                                        <button type="submit" className="btn btn-primary">Login!</button>

                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
