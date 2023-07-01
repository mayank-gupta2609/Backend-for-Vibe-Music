import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

const Entry = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Link to='/login'>

                <button className="btn btn-primary"  >
                    Login!
                </button>
            </Link>

            <button className="btn btn-primary">
                Sign Up!
            </button>
        </div>
    )
}

export default Entry
