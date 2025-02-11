import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import { postCreateUser } from '../services/UserServices';
import { toast } from 'react-toastify';

const ModalsAddNew = (addNewProps) => {
    const { show, handleClose, handleUpdateUser } = addNewProps;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        console.log(">>>check res : ", res);
        if (res && res.id) {
            handleClose();
            setJob("");
            setName("");
            toast.success("A user is created succeed !")
            handleUpdateUser({ first_name: name, id: res.id })
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(event) => { setName(event.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Job"
                                value={job}
                                onChange={(event) => { setJob(event.target.value) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalsAddNew