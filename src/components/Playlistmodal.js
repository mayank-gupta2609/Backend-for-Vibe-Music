import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdated } from '../redux/features/userSlice';

const Playlistmodal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [pl, setPl] = useState(null);
    const dispatch = useDispatch()
    const { playlists, song, authtoken, updated } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(true)
    var s = []
    useEffect(() => {
        getPlaylists()
    }, [playlists])

    let data
    const getPlaylists = async () => {
        setLoading(true)
        let headersList = {
            "auth-token": authtoken,
        }

        let response = await fetch("http://localhost:5000/api/playlists/getallplaylists", {
            method: "GET",
            headers: headersList
        });


        data = await response.json();

        console.log(data);
        setPl(data)
        setLoading(false)

    }

    const addToPlaylist = async () => {
        var checkboxes = document.getElementsByName("pname")

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                s.push(checkboxes[i].value);

            }
        }
        console.log(s)
        let headerList = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('authtoken')
        }


        for (let i = 0; i < s.length; i++) {

            let bodyContent = JSON.stringify({
                "name": s[i],
                "track": song.name
            })

            let response = await fetch("http://localhost:5000/api/playlists/addtoplaylist/", {
                method: "PUT",
                body: bodyContent,
                headers: headerList
            });

            console.log(await response.json())
        }


    }


    const handleShow = () => {
        setShow(true);
    }

    const handleCloseSubmit = () => {
        addToPlaylist()
        dispatch(setUpdated(true))
        setShow(false)
    }


    return (
        <>
            <div className="text-center  me-3">

                <div>
                    <button className="btn btn-warning" onClick={handleShow}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} id="modalc" style={{ backdropFilter: 'blur(10px)' }} >

                <Modal.Body className="modalcustom text-center">

                    <h5>Select Playlist</h5>
                    <hr style={{ color: 'white' }} />
                    {!loading && pl.map(playlist => {
                        return <div style={{ display: 'flex' }} className="justify-content-between">
                            <div>
                                <h6 style={{ color: 'white' }}>{playlist.name}</h6>
                            </div>

                            <div>
                                <input type="checkbox" onClick={(e) => {
                                    console.log(e.target.value)
                                }
                                } value={playlist.name} name="pname" />

                            </div>
                        </div>

                    })}

                    <Button variant="secondary" onClick={handleClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                    <Button variant="primary" onClick={handleCloseSubmit}>
                        <i className="fa-solid fa-check"></i>
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Playlistmodal
