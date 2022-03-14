import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import GetForm from './pages/GetForm';
import CheckForm from './pages/CheckForm';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/form/get' element={<GetForm />} />
            <Route path='/form/check' element={<CheckForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
