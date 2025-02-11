import { Modal, Button } from 'react-bootstrap';
import _ from "lodash"

const ModalConfirm = (addNewProps) => {
    const { show, handleClose, dataDeleteUsers } = addNewProps;
    const confirmDelete = () => {

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