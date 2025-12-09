import Main from './Main';
import Mypage from './Mypage';
import Navbar from './Navbar';
import LogHistory from './LogHistory';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="Main" element={<Main />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/history" element={<LogHistory />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
