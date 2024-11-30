import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArtworkCard from '../components/ArtworkCard';
import CategoryFilter from '../components/CategoryFilter';
import Lightbox from '../components/Lightbox';
import { useArtworkStore } from '../store/useArtworkStore';
import { Artwork } from '../types/artwork';

const Gallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const artworks = useArtworkStore((state) => state.artworks);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(artworks.map((artwork) => artwork.category))];
  const filteredArtworks = selectedCategory === 'all'
    ? artworks
    : artworks.filter((artwork) => artwork.category === selectedCategory);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl mb-8 text-center">Galerie</h1>
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filteredArtworks.map((artwork) => (
            <motion.div
              key={`${selectedCategory}-${artwork.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              layout
              className="w-full"
            >
              <ArtworkCard
                artwork={artwork}
                onClick={() => setSelectedArtwork(artwork)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
};

export default Gallery;