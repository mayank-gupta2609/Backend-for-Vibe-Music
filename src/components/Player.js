import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Playlistmodal from './Playlistmodal';
import { useSelector, useDispatch } from "react-redux";
import { setNextSong, setPrevSong, setSong, setSwitched, setLiked } from '../redux/features/userSlice';
import { setArtistName } from '../redux/features/artistSlice';
function Player() {
  const { songs, current_song_index, switched, song, likedsongs,user_id } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [play, setPlay] = useState('pause')
  var a = document.querySelector('audio')
  const switchAtoV = async () => {
    dispatch(setSwitched(true))
    const player = document.querySelector('video')
    let u = song.location.replace('audio', 'video')
    a.pause()
    u = u.replace('mp3', 'mp4')
    player.src = u
    let t = a.currentTime
    player.currentTime = t
    player.play()

  }

  const [op, setOp] = useState("addto")
  const [method, setMethod] = useState("post")

  const addSong = () =>{

  }


  const handleLikeClick = async () => {
    dispatch(setLiked(true))
    if (likedsongs.includes(song._id)) {
      setOp("deletefrom")
      setMethod("delete")
    } else {
      setMethod("post")
      setOp("addto")
    }
    let headersList = {
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "track": song.name
    });

    let response = await fetch(`http://localhost:5000/api/likedsongs/${op}likedsongs/${user_id}`, {
      method: method,
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    // setLike("solid")
    dispatch(setLiked(false))
  }

  // console.log(song.artist.join(","))

  const handleArtistClick = async (a) => {
    console.log(a)
    dispatch(setArtistName(a))
    navigate(`/artists/${"@" + a.split(" ").join("")}`)
  }

  return (
    <>

      <div style={{ display: 'flex' }}>
        {song && <div>
          <img src={song.img} alt="" style={{ height: '106px' }} className="me-4" />
        </div>}

        {song && <div style={{ height: '100%', width: '30%' }} className="me-4 mt-3">
          <h2 style={{ color: 'whitesmoke' }} >{song.name}</h2>
          <div className='d-flex' style={{ color: 'white', textDecoration: "underline" }} >
            {song.artist.map((a) => {
              return <div className='me-2'>
                <h6 onClick={() => handleArtistClick(a)}>{a}</h6>
              </div>

            })}
          </div>


        </div>}

        <div className=" justify-content-center mt-2" style={{ width: '30%' }} >
          <div className="justify-content-center d-flex" style={{ height: '50%', width: '100%' }}>

            <div className="prev">
              <div className='mt-2' style={{ color: 'white' }} onClick={() => {
                if (current_song_index > 0) {
                  dispatch(setPrevSong())
                  dispatch(setSong(songs[current_song_index - 1]))
                  document.querySelector('video').pause()
                  document.querySelector('video').currentTime = 0
                }
                dispatch(setSwitched(false))
              }}>
                <i className="fa-solid fa-backward"></i>
              </div>
            </div>
            <div className="audioc ms-4 me-4 mt-2" onClick={() => {
              if (a && a.paused) {
                a.play()
                setPlay('pause')

              } else {
                a.pause()
                setPlay('play')

              }
            }} >


              {song && <i className={`fa-solid fa-${a.paused ? "play" : "pause"}`} style={{ color: 'white' }}></i>}
            </div>
            <div className="next">

              <div className='mt-2' style={{ color: 'white' }} onClick={() => {
                if (current_song_index < songs.length - 1) {
                  dispatch(setNextSong())
                  dispatch(setSong(songs[current_song_index + 1]))
                  document.querySelector('video').pause()
                  document.querySelector('video').currentTime = 0
                }
                dispatch(setSwitched(false))
              }}>
                <i className="fa-solid fa-forward"></i>
              </div>
            </div>
            <div>
              <button className="btn btn-primary ms-3" onClick={() => {
                dispatch(setSwitched(true))
                switchAtoV()
              }} disabled={switched === true}>

                <i className="fa-solid fa-play"></i>

              </button>
            </div>
          </div>

          <div style={{ height: '50%' }}>
            <audio style={{ height: '40px', width: '100%', borderRadius: '80px', border: '1px solid black' }}
              src={song ? song.location : ''}
              autoPlay
              controls
              preload='auto'
              loop
            />

          </div>

        </div>

        <Playlistmodal />
        <div style={{ color: 'white' }}>
          <button className="btn btn-success" onClick={handleLikeClick}>
            <i className={`fa-${song && likedsongs.includes(song._id) ? "solid" : "regular"} fa-heart`}></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default Player
