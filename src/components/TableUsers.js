import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UserServices';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalsAddNew from './ModalsAddNew';
import ModalEditUsers from './ModalEditUsers';
import _ from "lodash"
import ModalConfirm from './ModalConfirm';


const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [dataEditUsers, setDataEditUsers] = useState({});
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [dataDeleteUsers, setDataDeleteUser] = useState({})

    useEffect(() => {
        getUser(1);
    }, []);

    const getUser = async (page) => {
        let res = await fetchAllUsers(page);

        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setTotalPage(res.total_pages);
        }
    }

    const handleEditUserFromModal = (user) => {
        let temp = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id)
        temp[index].first_name = user.first_name;
        setListUsers(temp);
    }
    const handleDeleteUsersFromModal = (user) => {
        let temp = _.cloneDeep(listUsers);
        temp = temp.filter(item => item.id !== user.id)
        setListUsers(temp);
    }
    const handleUpdateUser = (item) => {
        setListUsers([item, ...listUsers]);
    }
    const handlePageClick = (event) => {
        getUser(event.selected + 1);
    }
    const handleEditUsers = (user) => {
        setIsShowEdit(true);
        setDataEditUsers(user)
    }
    const handleDeleteUsers = (user) => {
        setIsShowDeleteModal(true);
        setDataDeleteUser(user);
    }

    return (<>
        <div className="my-4 add-new">
            <span><b>List users :</b></span>
            <button className='btn btn-success' onClick={() => setIsShow(true)}>
                Add new users
            </button>
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length > 0 &&
                    listUsers.map((user, index) => {
                        return (
                            <tr key={`user-${index}`}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditUsers(user)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleDeleteUsers(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )
                }
            </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalsAddNew
            show={isShow}
            handleClose={() => setIsShow(false)}
            handleUpdateUser={handleUpdateUser}
        />
        <ModalEditUsers
            show={isShowEdit}
            dataEditUsers={dataEditUsers}
            handleClose={() => setIsShowEdit(false)}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalConfirm
            show={isShowDeleteModal}
            handleClose={() => setIsShowDeleteModal(false)}
            dataDeleteUsers={dataDeleteUsers}
            handleDeleteUsersFromModal={handleDeleteUsersFromModal}
        />
    </>)
}

export default TableUsers;