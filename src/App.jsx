import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Public from './views/public';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Todo from './views/Todo';

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Public />}>
          <Route path="" element={<Login />} />
          <Route path="sign_up" element={<SignUp />} />
        </Route>
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
