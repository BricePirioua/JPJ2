import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import Biography from './pages/Biography';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { useArtworkStore } from './store/useArtworkStore';

function App() {
  const fetchArtworks = useArtworkStore((state) => state.fetchArtworks);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:id" element={<ArtworkDetail />} />
          <Route path="biography" element={<Biography />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;