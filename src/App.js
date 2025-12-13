import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

import Main from './Main';
import Mypage from './Mypage';
import Navbar from './Navbar';
import Search from './Search';
import Register from './Register';
import Record from './Record';
import LogHistory from './LogHistory';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />

        <div className="content-wrap">
          <Routes>
            <Route path="Main" element={<Main />} />
            <Route path="Record" element={<Record />} />
            <Route path="Mypage" element={<Mypage />} />
            <Route path="Search" element={<Search />} />
            <Route path="Register" element={<Register />} />
            <Route path="History" element={<LogHistory />} />
            <Route path="Record" element={<Record />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
