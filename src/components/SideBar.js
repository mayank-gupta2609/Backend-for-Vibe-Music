// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setActivePlaylist } from '../redux/features/userSlice';
import { Link } from 'react-router-dom';
import Modals from './Modals';

function SideBar() {


  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();

  const { playlists, authtoken } = useSelector((state) => state.user)

  const getPlaylists = async () => {
    let headersList = {
      "auth-token": authtoken,
    }

    let response = await fetch("http://localhost:5000/api/playlists/getallplaylists", {
      method: "GET",
      headers: headersList
    });


    let data = await response.json();
    dispatch(setPlaylist(data))
    console.log(playlists);
    setPlaylist(data);
  }

  useEffect(() => {
    getPlaylists();
    // eslint-disable-next-line
  }, [playlists])

  const options = ["Home", "Artists", "Likes", "Discover", "History"]



  return (
    <div>
      <h1 className="text-center mb-5" style={{ color: 'whitesmoke' }}>MusicApp</h1>

      <div className='container'>
        <div className='text-center'>
          {options.map((ele) => {
            return <h6 key={ele} style={{ marginBottom: '25px', borderRadius: '10px' }} ><Link style={{ color: 'whitesmoke', textDecoration: 'none' }} to={`${ele}`}> {ele} </Link></h6>;
          })}
        </div>
      </div>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-1 border-bottom"></div>

      <h4 className="text-center" style={{ color: 'whitesmoke', marginBottom: '25px' }} >Playlists</h4>
      <div className='container' >
        <div className='text-center' style={{ overflowY: 'scroll', height: '150px' }} >
          {playlist && playlist.map((ele) => {
            return <h6 key={ele._id} style={{ color: 'black', marginBottom: '25px' }} onClick={() => {
              dispatch(setActivePlaylist(ele._id))
            }}>
              <Link to={`/playlist/${ele._id}`} style={{ color: 'whitesmoke', textDecoration: 'none' }}> {ele.name} </Link>
            </h6>;
          })}
        </div>
      </div>

      <Modals />



    </div>
  )
}

export default SideBar
