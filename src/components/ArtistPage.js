import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Link } from 'react-router-dom';
import { setAlbum } from '../redux/features/albumSlice';
import { setArtist } from '../redux/features/artistSlice';
import { setSong, setSongIndex, setSongs, setSwitched, setTrackPlaying } from '../redux/features/userSlice';
const ArtistPage = () => {
  const { songs } = useSelector((state) => state.user)
  const { artist, artistname } = useSelector((state) => state.artist)

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const getArtist = async () => {
    setLoading(true)
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    }

    let response = await fetch(`http://localhost:5000/api/artists/getartistinfo/${artistname}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    console.log(data);

    console.log(data[0].albums)
    dispatch(setArtist(data))
    console.log(data.a);
    setLoading(false)
  }

  useEffect(() => {
    getArtist()
  }, [artistname])

  const handleClick = async (n) => {
    dispatch(setSwitched(false))
    if (document.querySelector('video')) {
      document.querySelector('video').pause()
      document.querySelector('video').currentTime = 0
    }
    dispatch(setSong(n))
    dispatch(setSongs(artist[0].songs))
    dispatch(setTrackPlaying(true))
    dispatch(setSongIndex(songs.indexOf(n)));
    console.log(n)

  }

  return (
    <>
      {!loading && <div style={{ width: '90%' }} className="ms-3 me-3 mt-3 text-center">
        <div className="d-flex" style={{ width: '100%', height: '200px' }}>
          <div style={{ height: '100%' }}>
            <img src={artist[0].avatar} alt="" style={{ height: '100%', borderRadius: '10%' }} />
          </div>
          <div>
            <h3 style={{ color: 'white' }} className="mt-5 pt-4 ps-4 ms-3">{artist[0].name}</h3>
          </div>
        </div>

      </div>}

      <div className="mt-4 ms-4" style={{ color: 'white' }}>
        {artist && <h3>Albums</h3>}
        {!loading && artist[0].albums.map((a) => {
          return <div  >
            <img src={a.img} height="150px" alt="" />
            <Link to={`/artists/${"@" + artist[0].name.split(" ").join("")}/${a.name}`}>
              <h6 onClick={() => dispatch(setAlbum(a))}>{a.name}</h6>

            </Link>
          </div>

        })}

      </div>

      <div className="mt-4 ms-4" style={{ color: 'white' }}>
        <h1>Songs</h1>
        <div className="row">

          {!loading && artist[0].songs.map((a) => {
            return <div className="col-lg-3 col-md-4 text-center col-sm-2 me-4 mb-4" onClick={() => handleClick(a)}>
              <img src={a.img} alt="" height="150px" />
              <h4>{a.name}</h4>
            </div>

          })}
        </div>

      </div>
    </>
  )
}

export default ArtistPage
