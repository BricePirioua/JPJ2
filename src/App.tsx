import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ... autres imports

function App() {
  const fetchArtworks = useArtworkStore((state) => state.fetchArtworks);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <BrowserRouter basename="/JPJ2">
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
