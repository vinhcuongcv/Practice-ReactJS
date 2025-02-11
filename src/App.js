import { Container } from 'react-bootstrap';
import './App.scss';
import { useState } from 'react';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <TableUsers />
        </Container>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
