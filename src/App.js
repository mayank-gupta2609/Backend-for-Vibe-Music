
import Login from './components/Login';
import Home from './components/Home';
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import Artists from './components/Artists';
import Player from './components/Player';
import Search from './components/Search';
import Discover from './components/Discover';
import SideBar from './components/SideBar';
import Subscriptions from './components/Subscriptions';
import PlaylistContents from './components/PlaylistContents';
import Lyrics from './components/Lyrics';
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import LikedSongs from './components/LikedSongs';
import HistoryPage from './components/HistoryPage';
import { useEffect } from 'react';
import { setLikedsongs, setSwitched } from './redux/features/userSlice';

function App() {

  const dispatch = useDispatch()
  const { activeplaylist, logged_in, song, liked, user_id } = useSelector((state) => state.user)
  localStorage.setItem('changed', 0);
  

  useEffect(() => {
    if (song) document.title = song.name + "-" + song.artist
  }, [song])

 

  useEffect(() => {
     getLikedSongs()
  }, [])


  const getLikedSongs = async () => {
    let headersList = {
      "Content-Type": "application/json"
    }

    let response = await fetch(`http://localhost:5000/api/likedsongs/getlikedsongs/${user_id}`, {
      method: "GET",
      headers: headersList
    });

    let data = await response.json();
    dispatch(setLikedsongs(data.ids)) 
  }


  const updateHistory = async () => {
    let headersList = { 
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      "track": song.name,
    });

    let response = await fetch(`http://localhost:5000/api/history/updatehistory/${user_id}`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    if (song) {
      updateHistory()
    }
}, [song])


  if (!logged_in) {
    return <Login />
  }
  else {


    return (
      <>
        <div style={{ width: '100vw', height: '100vh' }} >

          <div className="upper" style={{ display: 'flex', height: '85%' }}>

            <div className="leftPart" style={{ width: '15%', backgroundColor: 'black' }}>
              <SideBar />
            </div>
            <div className="rightPart" style={{ width: '85%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="search__profile" style={{ height: '10%', backgroundColor: 'black' }}>
                <Search />
              </div>
              <div style={{ display: 'flex', overflowY: 'hidden', height: '100%' }}>

                <div className="main__contents" style={{ height: '100%', backgroundColor: 'rgba(20, 19, 12)', overflowY: 'scroll', overflowX: 'hidden', width: '70%' }}>
                  <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/home" element={<Home />}></Route>
                    <Route exact path="/artists" element={<Artists />}></Route>
                    <Route exact path={"/artists/:artistname"} element={<ArtistPage />} />
                    <Route exact path={"/artists/:artistname/:name"} element={<AlbumPage />} />
                    <Route exact path={"/likes"} element={<LikedSongs />} />
                    <Route exact path={"/history"} element={<HistoryPage />} />
                    <Route exact path="/subscriptions" element={<Subscriptions />}></Route>
                    <Route exact path={`/playlist/${activeplaylist}`} element={<PlaylistContents id={activeplaylist} />}></Route>
                    <Route exact path={"/discover"} element={<Discover />}></Route>
                  </Routes>
                </div>

                <div className="lyrics_content" style={{ height: '100%', backgroundColor: 'rgba(20, 19, 12)', overflowY: 'scroll', width: '30%' }}>
                  <Lyrics />
                </div>
              </div>
            </div>
          </div>
          <div className="lower" style={{ height: '15%', backgroundColor: 'black' }}>

            <div className="mainPlayer" style={{ visibility: song ? 'visible' : 'hidden' }}>
              <Player />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
