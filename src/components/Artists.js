import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setArtistName } from '../redux/features/artistSlice';
import Loading from './Loading';

function Artists() {

  const [artist_, setArtist_] = useState(null)

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const getArtists = async () => {

    setLoading(true)
    let headersList = {
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGUwNzNkN2E2MjA0MTU5MDdiZjkxIn0sImlhdCI6MTY3NTc1Njg5MH0.1f0DsE9_vAW8pxlHx0sWhud0YZed3IRXf_wskgMpuE4",
      "Content-Type": "application/json"
    }


    let response = await fetch("http://localhost:5000/api/artists/getartists/", {
      method: "GET",
      headers: headersList
    });

    let data = await response.json()
    setArtist_(data)
    setLoading(false)

  }



  const handleClick = async (n) => {
    dispatch(setArtistName(n.name))
  }
  useEffect(() => {
    getArtists()
  }, [])

  return (
    <div>
      <h1>Artists </h1>
      {loading && <Loading />}
      <div className="row">
        {!loading && artist_.map((a) => {
          return <div style={{ width: '200px', height: '200px' }} className="col-lg-1 col-md-2 text-center col-sm-2 me-4 mb-4" >
            <div onClick={() => handleClick(a)}>
              <img src={a.avatar} style={{ width: '80%', borderRadius: '50%' }} />
              <Link to={`/artists/${"@" + a.name.split(" ").join("")}`} style={{ color: 'whitesmoke', textDecoration: 'none' }} >
                <h6>{a.name}</h6>
              </Link>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Artists
