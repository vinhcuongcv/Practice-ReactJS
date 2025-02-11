import React, { useEffect, useState } from 'react'
import { Button, Modal, Toast } from 'react-bootstrap'
import { Form } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserServices';
import { toast } from 'react-toastify';

const ModalEditUsers = (Edit) => {
    const { show, handleClose, dataEditUsers, handleEditUserFromModal } = Edit;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    useEffect(() => {
        if (show) {
            setName(dataEditUsers.first_name)
        }
    }, [dataEditUsers])

    const handleEditUsers = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataEditUsers.id
            })
            handleClose();
            toast.success("Updated user succeed");
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUsers()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUsers