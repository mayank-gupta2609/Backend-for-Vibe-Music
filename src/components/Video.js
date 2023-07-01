import Draggable from 'react-draggable';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSwitched } from '../redux/features/userSlice';

import React from 'react'

const Video = () => {
    const { switched } = useSelector((state) => state.user)
    const [caption, setCaption] = useState(false)
    const dispatch = useDispatch();
    console.log(caption);
    return (
        <>
            <Draggable>

                <div className='trailer'
                    style={{
                        borderRadius: '20px',
                        position: 'fixed',
                        top: '15%',
                        left: '30%',
                        zIndex: '100000',
                        width: '600px',
                        height: '450px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(20px)',
                        visibility: switched === true ? 'visible' : 'hidden',
                        boxShadow: " inset 0px 0px 60px rgba(96, 236, 255, 0.8), 0px 5px 15px rgba(255, 96, 239, 0.8)"
                    }}>
                    <div className="justify-content-center mt-4 mb-2 d-flex">
                        <button className="btn btn-success ms-2 me-2" onClick={() => {
                            dispatch(setSwitched(false))
                            setCaption(false)
                            document.getElementById('lyricline').innerHTML = ""
                            const player = document.querySelector('video')
                            const a = document.querySelector('audio')
                            a.currentTime = player.currentTime
                            a.play()
                            player.currentTime = 0;
                            player.pause()
                        }}>
                            <i class="fa-solid fa-music"></i>
                        </button>

                        <button className="btn btn-light" onClick={() => {
                             setCaption(!caption)
                        }}>
                            <i class="fa-solid fa-closed-captioning"></i>
                        </button>

                    </div>
                        <div className="text-center" style={{height:'40px'}}>
                            <h5 id="lyricline" className="mb-0 pt-2" style={{visibility:caption===true ? 'visible' : 'hidden'}}></h5>
                        </div>
                    <div className=" mt-2" style={{ width: '100%', height: '70%' }}>
                        <video src={''} style={{ width: '100%', height: '100%' }} controls />

                    </div>

                </div>
            </Draggable>
        </>
    )
}

export default Video
