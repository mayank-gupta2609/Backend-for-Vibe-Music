import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn, setSearchTerm } from '../redux/features/userSlice';
function Search() {

    const { username } = useSelector((state) => state.user)

    const [term, setTerm] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onChange = (e) => {
        setTerm(e.target.value);
        dispatch(setSearchTerm(e.target.value))

    }

    const handleClick = () => {
        dispatch(setSearchTerm(term))
        navigate("/discover")
    }

    return (
        <div style={{ display: 'flex' }} className="justify-content-between">
            <div className=" mt-2" style={{ width: '38%', marginLeft: '10px', backgroundColor: 'white', borderRadius: '40px' }}>

                <div className="input-group rounded" style={{ width: '100%' }}>
                    <input type="search" className="form-control rounded-5 border-0 shadow-none" placeholder="Search" aria-label="Search"

                        aria-describedby="search-addon" onChange={onChange}
                        onSubmit={() => {
                            dispatch(setSearchTerm(term))
                            navigate("/discover")
                        }}

                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                dispatch(setSearchTerm(term))
                                navigate("/discover")
                            }
                        }}
                    />
                    <span className="input-group-text border-0" id="search-addon" style={{ width: '40px', borderRadius: '30px' }} onClick={handleClick}>
                        <i className="fas fa-search" ></i>

                    </span>
                </div>
            </div>

            <div className="text-end" style={{ display: 'flex' }}>
                <div className='mt-3 me-3' style={{ color: 'white' }}>
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                    <span className='ms-2'> {username}</span>

                </div>

                <button style={{ height: '30px', color: 'white' }} className="btn mt-2 pt-1 pb-2" onClick={() => {
                    dispatch(setLoggedIn(false))
                }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </div>
    )
}

export default Search
