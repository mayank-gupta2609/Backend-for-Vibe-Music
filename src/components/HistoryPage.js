import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSong, setSongs, setSwitched, setTrackPlaying } from '../redux/features/userSlice';

const HistoryPage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([])
    const [hid, setHid] = useState("")
    const { song, user_id } = useSelector((state) => state.user)

    const getHistory = async () => {
        setLoading(true)
        let headersList = {
            "Content-Type": "application/json"
        }

        let response = await fetch(`http://localhost:5000/api/history/gethistory/${user_id}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();


        console.log(data.history[0]._id)
        setHid(data.history[0]._id)
        setHistory(data.songs)

        setLoading(false)

    }

    const handleClick = async (index) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "i": index
        });

        let response = await fetch(`http://localhost:5000/api/history/deletehistory/${hid}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        console.log(response)
        getHistory()
    }

    useEffect(() => {
        getHistory()
    }, [song])


    const handleClick_ = async (n) => {
        dispatch(setSwitched(false))
        if (document.querySelector('video')) {
            document.querySelector('video').pause()
            document.querySelector('video').currentTime = 0
        }
        dispatch(setSong(n))
        dispatch(setTrackPlaying(true))
        dispatch(setSongs(n))

    }

    const clearHistory = async () => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGUwNzNkN2E2MjA0MTU5MDdiZjkxIn0sImlhdCI6MTY3NTc1Njg5MH0.1f0DsE9_vAW8pxlHx0sWhud0YZed3IRXf_wskgMpuE4",
            "Content-Type": "application/json"
        }

        let response = await fetch("http://localhost:5000/api/history/clearhistory/63e47850da62b574cfada621", {
            method: "POST",
            headers: headersList
        });

        getHistory()
    }
    return (
        <>
            <div className='d-flex justify-content-between' style={{ color: 'white' }}>
                <h1>History</h1>
                <div className='ms-3 mt-2 me-3'>

                    {history.length > 0 && <h4 onClick={() => clearHistory()}>Clear </h4>}
                </div>
            </div>
            <div className="row ms-1 mt-2 d-flex" style={{ color: 'white' }}>
                {!loading && history.map((h, index) => {
                    { history.length === 0 && <h4 >Nothing To Show</h4> }

                    return <div className="songcard d-flex " style={{ width: '50%', borderRadius: '20px' }} >
                        <div>
                            <img src={h.img} alt="" style={{ width: '120px', borderRadius: '50%' }} key={index} onClick={() => { handleClick_(h) }} />
                        </div>
                        <div className="ms-5 mt-4 align-items-center " style={{ width: '700px' }}>
                            <h3 style={{ color: 'whitesmoke' }} >{h.name}</h3>
                            <div className="d-flex">

                                {h.artist.map((a) => {
                                    return <h5 style={{ color: 'antiquewhite', textDecoration: 'underline' }} className="me-2">{a}</h5>
                                })}
                            </div>
                            <div className='mt-1'>
                                <button className="btn btn-danger" onClick={() => handleClick(index)}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </>
    )
}

export default HistoryPage
