import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import Main from './Main';
import Mypage from './Mypage';
import Navbar from './Navbar';
import Search from './Search';
import Login from './Login';
import Record from './Record';
import LogHistory from './LogHistory';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />

        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="Main" element={<Main />} />
            <Route path="Record" element={<Record />} />
            <Route path="Mypage" element={<Mypage />} />
            <Route path="Search" element={<Search />} />
            <Route path="Login" element={<Login />} />
            <Route path="History" element={<LogHistory />} />
            <Route path="Record" element={<Record />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;