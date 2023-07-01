import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Loading from './Loading';

const Lyrics = () => {


    const { song, authtoken } = useSelector((state) => state.user)
    const [lyrics, setLyrics] = useState([])
    const [loading, setLoading] = useState(true)
    const a = document.querySelector('audio')
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

        // console.log(a.currentTime)

        let data = await response.json();
        setLyrics(data.lyricContent);
        console.log(data)
        setLoading(false)
        lyrics.forEach((line) => {
            timestamp.push(line.split('|')[0].trim())

        })

        // ((line) => {
        // })

        let ids = []
        timestamp.forEach((stamp) => {
            let m = stamp.split(':')[0]
            ids.push((m % 10 * 60 - '0') + (stamp.split(':')[1] - '0'))
        })
        // console.log(ids)





        // console.log(timestamp)
        useEffect(() => {
            getLyrics()
        }, [song])

        // let i = 1
        // if (song && a) {
        //     document.getElementById(timestamp[i] % 10).style.color = 'green'
        // console.log(i)
        // console.log('o')
        // for()
        // const setColor = async () => {
        //     await 
        // }
    }


    return (
        <div className="ps-2 pe-2">
            {!song && <h6>No Current Music</h6>}
            {song && <h2 style={{
                color: song ? 'cyan' : 'white'
            }}>Lyrics <span style={{ color: 'pink' }}>{song.name}</span></h2>}
            {loading && song && <Loading />}
            {/* {!loading && <div id="lyricholder">

            </div>} */}
            {!loading && lyrics.map((line) => {
                return <h5 id={id} style={{ color: 'white' }}>{line.split('|')[1]}
                </h5>
                {/* return <h5 id={
                    (line.split(':')[0] % 10) * 60 - '0' + (line.split(':')[1].split("|")[0] - '0')
                } style={{ color: 'white' }}>{line.split('|')[1]}
                </h5> */}
            })}




        </div >
    )

}

export default Lyrics
