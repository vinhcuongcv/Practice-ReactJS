import { Modal, Button } from 'react-bootstrap';
import _ from "lodash"
import { deleteUsers } from '../services/UserServices';
import { toast } from 'react-toastify';
const ModalConfirm = (addNewProps) => {
    const { show, handleClose, dataDeleteUsers, handleDeleteUsersFromModal } = addNewProps;
    const confirmDelete = async () => {
        let res = await deleteUsers(dataDeleteUsers.id)
        if (res && +res.statusCode === 204) {
            toast.success("Delete user success");
            handleClose();
            handleDeleteUsersFromModal(dataDeleteUsers);
        }
        else {
            toast.error("Delete user fail");
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        this action can't be undone !
                        Do you want to delete this user ?
                        <br />
                        <b>Email = "{dataDeleteUsers.email}"</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm