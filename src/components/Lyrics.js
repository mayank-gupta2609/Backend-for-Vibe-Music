import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import Loading from './Loading';
import Video from './Video';

const Lyrics = () => {


    const { song, authtoken } = useSelector((state) => state.user)
    const [lyrics, setLyrics] = useState([])
    const [loading, setLoading] = useState(true)
    let timestamp = []

    const getLyrics = async () => {
        let headersList = {
            "auth-token": authtoken
        }

        setLoading(true)
        let response = await fetch(`http://localhost:5000/api/songs/getsonglyrics/${song.name}`, {
            method: "GET",
            headers: headersList
        });


        let data = await response.json();
        setLyrics(data.lyricContent);
        // console.log(data)
        setLoading(false)
    }

    if (song && song.name === "Butter") {
        lyrics.forEach((line) => {
            timestamp.push(line.split('|')[0])
        })
    }

    const a = document.querySelector('audio')
    var prev
   

    if (a) {
        a.addEventListener('timeupdate', () => {
            if (document.getElementById(Math.ceil(a.currentTime))) {
                if (prev) {
                    prev.style.color = 'white'
                }
                document.getElementById(Math.ceil(a.currentTime)).style.transition = '1s'
                document.getElementById(Math.ceil(a.currentTime)).style.color = 'yellow'

                prev = document.getElementById(Math.ceil(a.currentTime))
 
                //   ele.scrollTop+=10
            }
        })

    }

    const v = document.querySelector('video')
    if (v) {
        v.addEventListener('timeupdate', () => {
            if (document.getElementById(Math.ceil(v.currentTime))) {
                if (prev) {
                    prev.style.color = 'white'
                }
                document.getElementById(Math.ceil(v.currentTime)).style.transition = '1.2s'
                document.getElementById(Math.ceil(v.currentTime)).style.color = '#A149FA'
                prev = document.getElementById(Math.ceil(v.currentTime)) 
               document.getElementById('lyricline').innerHTML = document.getElementById(Math.ceil(v.currentTime)).innerHTML

            }

        })
    }
    useEffect(() => {
        if (song) {
            getLyrics()

        }
    }, [song])

    return (
        <div className="ps-2 pe-2 holder" style={{ overflow: 'hidden' }}>
            {!song && <h6>No Current Music</h6>}
            {song && <div>

                <div  >

                {song.name !== "Achyutam Keshavam" && <h2 style={{
                    color: song ? 'cyan' : 'white' 
                }}>Lyrics <h4 style={{ color: 'pink' }}>{song.name}</h4></h2>}
                {loading && song && song.name !== "Achyutam Keshavam" && <Loading />}
                </div>
                <div className="">

                {song.name !== "Achyutam Keshavam" && <div id="lyricsholder"  style={{ margintop:'10px'}}>

                    {!loading && (song.name === "Butter" || song.name === "Chlorine" || song.name === "Counting Stars" || song.name === "Bones" || song.name === "Aathma Rama" || song.name === "You Belong With Me" || song.name === "Hayya Hayya" || song.name==="Baby" ) && lyrics.map((line) => {
                        return <h5 style={{ color: 'white' }}
                            id={Math.ceil(((line.split("|")[0].split(":")[0]) % 10 - '0') * 60 + (line.split("|")[0].split(":")[1] - '0'))}
                        >{line.split('|')[1]}</h5>
                    })}
                    {!loading && song.name !== "Butter" && lyrics.map((line) => {
                        return <h5 style={{ color: 'white' }}>{line}</h5>
                    })}
                </div>}

                </div>
                 
                <Video />

                {song.name === "Achyutam Keshavam" && 
                    <div style={{ width:'100%', borderRadius:'5px'}} className="mt-0 flagged">

                <div style={{ overflow: 'hidden' }} className="pt-1 ms-1 me-1" >
                    <video src={song.location.replace('audio', 'video').replace('mp3', 'mp4')} autoPlay="true" muted onContextMenu={e => e.preventDefault()} height='545px' loop></video>

                    </div>
                </div>} 

            </div>}

        </div >
    )
}

export default Lyrics
