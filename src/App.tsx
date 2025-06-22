import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import SpotifyCallback from './pages/SpotifyCallback';
import Dashboard from './pages/Dashboard';
import CriarPlaylist from './pages/CriarPlaylist';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<SpotifyCallback />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/criar-playlist" element={<CriarPlaylist />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App
