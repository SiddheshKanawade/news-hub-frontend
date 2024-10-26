import './App.css';
import './styles/ticker.css';
import './styles/auth.css'

import Newsapp from './pages/Newsapp';
import Feed from './pages/Feed';
import Ticker from './pages/Ticker';
import KeywordSearch from './pages/KeywordSearch';
import Navbar from './Components/Navbar';
import Error from './Components/Error';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FeedSource from './pages/FeedSource';
import ProtectedRoute from './Components/ProtectedRoute';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

function AppContent() {
  const location = useLocation();

  // Define the paths where the Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/signup', '/feed-sources'];

  // Check if current path is one of the paths where Navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only if it's not a "hideNavbar" route */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed-sources" element={<FeedSource />} />

        <Route path="/" element={<Newsapp />} />
        <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
        <Route path="/ticker" element={<Ticker />} />
        <Route path="/keysearch" element={<KeywordSearch />} />

        {/* Error route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
