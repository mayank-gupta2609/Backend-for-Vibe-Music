import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setSongIndex, setSongs, setTracklist, setTrackname, setTracksrc, setSwitched, setSong, setUpdated } from '../redux/features/userSlice';
import Loading from './Loading';

function PlaylistContents() {

  const [tracks, setTracks] = useState([])
  const { activeplaylist, updated } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [playlistname, setPlaylistname] = useState();
  const [loading, setLoading] = useState(true);


  const getPlaylist = async () => {

    let headersList = {
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMGUwNzNkN2E2MjA0MTU5MDdiZjkxIn0sImlhdCI6MTY3NDc4OTcxMn0.O0YEN4jsHFqvolcQUlBxcMEc6YqKaeZ-7hntWMg9yGw"
    }

    let response = await fetch(`http://localhost:5000/api/playlists/getplaylist/${activeplaylist}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    setPlaylistname(data.playlist[0].name)
    console.log(data)
    // console.log(data);
    setTracks(data.songs)
    setLoading(false);
  }

  // console.log(tracks)


  useEffect(() => {
    dispatch(setTracklist([]))
    getPlaylist()
    dispatch(setUpdated(false))
  }, [activeplaylist, updated])


  const handleClick = (n) => {
    dispatch(setSongs(tracks))
    dispatch(setSong(n))
    var src = n.location
    dispatch(setSwitched(false))
    document.querySelector('video').pause()
    document.querySelector('video').currentTime = 0

    dispatch(setTracksrc(src))
    dispatch(setTrackname(n.name))
    dispatch(setSongIndex(tracks.indexOf(n)))
  }

  return (
    <>


      <div style={{
        display: 'flex', height: '200px',
        backgroundImage: "linear-gradient(to top right, rgba(20, 19, 12), #019CAD, rgba(20, 19, 12))"
      }}>
        {loading && <Loading />}
        <div className='me-4 mt-4' style={{ display: 'flex' }}>

          <div style={{
            width: '155px', height: '155px',
          }} className="ms-4">
            {!loading && tracks.length >= 4 && <div style={{ width: '200px', height: '200px' }}>
              <div style={{ display: 'flex', height: '75px', width: '100px' }}>
                <div>
                  <img src={tracks[0].img} alt="" style={{ height: '100%' }} />
                </div>
                <div>
                  <img src={tracks[1].img} alt="" style={{ height: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', height: '75px', width: '100px' }}>
                <div>
                  <img src={tracks[2].img} alt="" style={{ height: '100%' }} />
                </div>
                <div>
                  <img src={tracks[3].img} alt="" style={{ height: '100%' }} />
                </div>
              </div>
            </div>}

            {!loading && tracks[0] && tracks.length < 4 && <div style={{ width: '100px', height: '100px' }}>
              <img src={tracks[0].img} alt="" style={{ height: '100%' }} />
            </div>}
          </div>

        </div>

        <div className='mt-3'>
          <h1 style={{ color: 'white' }}>{playlistname}</h1>
        </div>
      </div>


      <div className='d-flex' style={{ color: 'white' }}>
        <div>
          <h4 className='ms-5 mt-3 me-5'>
            #
          </h4>
        </div>

        <div className='ms-5 mt-3'>
          <h4>

            Track
          </h4>
        </div>

        <div className=' me-5 mt-3' style={{ marginLeft: '300px' }}>
          <h4>
            Artist

          </h4>
        </div>

      </div>

      <div>

        {!loading && tracks.map((track) => {
          return <div key={track._id} style={{ width: '100%' }} onClick={() => handleClick(track)}>
            <div className="  d-flex" id={track._id}>
              <div className="text-center ms-5 me-5 mt-1 mb-1 " >
                <img src={track.img} alt="" style={{ width: '30px' }} />
              </div>
              <div style={{ display: 'flex' }}>

                <div className=' mt-1 ms-4 me-5' style={{ width: '270px' }}>
                  <h5>{track.name}</h5>

                </div>
                <div className=' mt-1 ms-5 me-5 ' style={{ marginLeft: '150px' }}>

                  <h5>{track.artist}</h5>
                </div>
              </div>
            </div>


          </div>
        })}
      </div>



    </>
  )
}

export default PlaylistContents
