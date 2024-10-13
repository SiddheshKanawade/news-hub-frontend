import logo from './logo.svg';
import './App.css';
import Newsapp from './pages/Newsapp';
import Feed from './pages/Feed';
import Ticker from './pages/Ticker';
import KeywordSearch from './pages/KeywordSearch';
import Navbar from './Components/Navbar';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Newsapp />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ticker" element={<Ticker />} />
        <Route path="/keysearch" element={<KeywordSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
