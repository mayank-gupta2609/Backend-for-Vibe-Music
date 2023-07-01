import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSong, setSongIndex, setSongs, setSwitched, setTrackPlaying, setLikedsongs } from '../redux/features/userSlice';

const LikedSongs = () => {
    const [ls, setLs] = useState([])
    const [loading, setLoading] = useState(true)
    const { user_id, liked } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleClick = async (n) => {
        dispatch(setSwitched(false))
        if (document.querySelector('video')) {
            document.querySelector('video').pause()
            document.querySelector('video').currentTime = 0
        }
        dispatch(setSong(n))
        dispatch(setSongs(ls))
        dispatch(setTrackPlaying(true))
        dispatch(setSongIndex(ls.indexOf(n)));
        console.log(n)

    }

    const getLikedSongs = async () => {
        setLoading(true)
        let headersList = {
            "Content-Type": "application/json"
        }


        let response = await fetch(`http://localhost:5000/api/likedsongs/getlikedsongs/${user_id}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        dispatch(setLikedsongs(data.ids));
        setLs(data.songs)
        console.log(data.ids);
        setLoading(false)
    }

    useEffect(() => {
        getLikedSongs()
    }, [liked])

    return (
        <>

            <div style={{ color: 'white' }}>
                <h1>Liked Songs</h1>
            </div>
            <div className="row">

                {!loading && ls.map((a) => {
                    return <div className="col-lg-4 col-md-4  col-sm-2  mb-4 d-flex" onClick={() => handleClick(a)}>
                        <div className='me-2' key={a._id}>
                            <img src={a.img} alt="" style={{ width: '100px', borderRadius: '50%' }} className="songcard" />
                        </div>
                        <div className="mt-4 ms-1 ">
                            <h5 style={{ color: 'white' }} >{a.name}</h5>
                            <h6>{a.artist}</h6>

                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default LikedSongs
