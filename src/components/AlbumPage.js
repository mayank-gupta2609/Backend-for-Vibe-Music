import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setAlbum, settracks } from '../redux/features/albumSlice';
import { setSong, setSongIndex, setSongs, setSwitched, setTrackPlaying } from '../redux/features/userSlice';

const AlbumPage = () => {

    const { album, tracks } = useSelector((state) => state.album)
    const [loading, setLoading] = useState(true)
    // let tracks = []
    const dispatch = useDispatch()
    const getAlbum = async () => {

        setLoading(true)
        let headersList = {
            "Content-Type": "application/json"
        }

        let response = await fetch(`http://localhost:5000/api/albums/getalbums/${album._id}`, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        console.log(data)
        dispatch(setAlbum(data.album__))
        dispatch(settracks(data.songs))
        setLoading(false)
        console.log(tracks)
    }

    useEffect(() => {
        getAlbum()
    }, [])

    const handleClick = async (n) => {
        dispatch(setSwitched(false))
        if (document.querySelector('video')) {
            document.querySelector('video').pause()
            document.querySelector('video').currentTime = 0
        }
        dispatch(setSong(n))
        dispatch(setSongs(tracks))
        dispatch(setTrackPlaying(true))
        dispatch(setSongIndex(tracks.indexOf(n)));
        console.log(n)

    }

    return (
        <>

            {!loading && <div style={{ color: 'white' }}>
                <h1 className="ms-4">{album.name}</h1>
                <img src={album ? album.img : "https://upload.wikimedia.org/wikipedia/en/f/f3/Trench_Twenty_One_Pilots.png"} alt=""
                    height='150px'
                    className='songcard ms-5 mb-5 '
                />

                <h1 className="ms-4">Tracks</h1>
                <div className="row">

                    {tracks.map((s) => {
                        return <div style={{ color: 'white' }} onClick={() => handleClick(s)} className="col-lg-2 col-md-4 ms-3 text-center">
                            <img src={s.img} alt="" height='150px' className='songcard' />
                            <h4>{s.name}</h4>
                        </div>
                    })}
                </div>

            </div>}

        </>
    )

}

export default AlbumPage
