import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setArtistName } from '../redux/features/artistSlice';
import { useNavigate } from 'react-router-dom';
import { setSongs, setSong, setSongIndex, setSwitched, setTrackPlaying } from '../redux/features/userSlice';

import Loading from './Loading';
function MainContents() {

    const [tracks, setTracks] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const { switched } = useSelector((state) => state.user)

    const getsongs = async () => {
        setLoading(true)
        let data = await fetch('http://localhost:5000/api/songs/getallsongs');
        if (switched === true) {
            dispatch(setSwitched(true))
        }
        let response = await data.json();
        console.log(response)
        setTracks(response);
        setLoading(false)
    }



    useEffect(() => {
        getsongs()
    }, [])



    const handleClick = async (n) => {
        dispatch(setSwitched(false))
        if (document.querySelector('video')) {
            document.querySelector('video').pause()
            document.querySelector('video').currentTime = 0
        }
        dispatch(setSong(n))
        // console.log(setSong(n))
        dispatch(setSongs(tracks))
        dispatch(setTrackPlaying(true))
        dispatch(setSongIndex(tracks.indexOf(n)));
        console.log(n)

    }

    const handleArtistClick = async (a) => {
        console.log(a)
        dispatch(setArtistName(a))
        navigate(`/artists/${"@" + a.split(" ").join("")}`)
    }



    return (
        <>



            <h2 className="mt-2 ms-2 text-center" style={{ color: 'white' }}> Top Songs</h2>
            <div className="container" style={{
                display: 'flex'
            }}>

                <div className="right" style={{ width: '100%', height: '100%' }}>
                    {loading && <Loading />}
                    {/* <SkeletonTheme> */}

                    <div className="row justify-content-center ">
                        {loading}
                        {!loading && tracks.map((track) => {
                            return <div key={track._id} style={{ width: '190px', color: 'white' }} className=" col-lg-3 col-md-4 text-center col-sm-6 me-1 mb-4" >
                                <div className="text-center" >
                                    <div style={{ width: '100%' }}>
                                        <div style={{ width: '100%', marginLeft: '0px' }} onClick={() => handleClick(track)}>
                                            <img src={track.img} alt="" style={{ width: '80%', borderRadius: '10%' }} className="songcard" />
                                            <h5>{track.name}</h5>
                                        </div>
                                        <div style={{ width: '100%', textDecoration: 'underline' }} className="justify-content-center d-flex">

                                            {track.artist.map((a) => {
                                                return <h6 onClick={() => handleArtistClick(a)} className="me-1">{a}</h6>
                                            })}

                                        </div>
                                    </div>
                                </div>



                            </div>
                        })}

                    </div>

                    {/* </SkeletonTheme> */}
                </div>



            </div>

        </>
    )

}

export default MainContents
