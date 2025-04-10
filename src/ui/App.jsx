import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Frame from './components/frame';
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './pages/User';

function App() {
  const [userData, setUserData] = useState(null);
  const [time, setTime] = useState(null);


  useEffect(() => {
    const unsubscribe = window.electron.subscribeStatistics((stats) => {
      setTime(stats);
    });
    return unsubscribe;
  })



  return (
    <>

      <Frame />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div>

        <Link to="/users">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <h1>Vite + React : {time}</h1>
      <div className="card">
        <button>
          Fetch User Data
        </button>
        {userData && (
          <div>
            <p><strong>Full Name:</strong> {userData.full_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Password:</strong> {userData.password}</p>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
