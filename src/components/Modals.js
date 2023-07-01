import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../redux/features/userSlice';

const Modals = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [line, setLine] = useState("");

    const [pl, setPl] = useState(null);
    const dispatch = useDispatch()
    const { playlists, authtoken } = useSelector((state) => state.user)

    const addPlaylist = async () => {

        console.log(line)

        let headersList = {
            "Content-Type": "application/json",
            "auth-token": authtoken
        }
        console.log(playlists)
        let bodyContent = JSON.stringify({
            "name": name,
            "track": []
        });

        let response = await fetch("http://localhost:5000/api/playlists/addplaylist", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        console.log(data);
        dispatch(setPlaylist({ ...playlists, data }))
        setPl(playlists)
        console.log(pl)
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleCloseSubmit = () => {
        setShow(false)
        addPlaylist()
    }

    return (
        <>
            <div className="text-center">

                <Button onClick={handleShow}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} id="modalc" style={{ backdropFilter: 'blur(10px)' }} >
                <h2></h2>
                <Modal.Body className="modalcustom text-center">
                    <Form  >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label >
                                <div>
                                    <h5 > Playlist Name </h5>
                                </div>
                            </Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    console.log(e.target.value)
                                }
                                }
                            />
                        </Form.Group>

                        <div className='d-flex text-center' style={{ color: 'white', width: '100%', justifyContent: 'center' }}>

                            <div onClick={handleClose} >
                                <i className="fa-solid fa-xmark me-4 mt-3"  
                                ></i>
                            </div>
                            <div onClick={handleCloseSubmit}>
                                <i className="fa-solid fa-plus mt-3"></i>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Modals
