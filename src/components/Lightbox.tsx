import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Artwork } from '../types/artwork';

interface LightboxProps {
  artwork: Artwork | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="max-w-4xl w-full">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-auto rounded-lg"
          />
          <div className="mt-4 text-white">
            <h2 className="font-serif text-2xl">{artwork.title}</h2>
            <p className="mt-2 text-gray-300">
              {artwork.technique}, {artwork.dimensions} - {artwork.year}
            </p>
            {artwork.description && (
              <p className="mt-2 text-gray-300">{artwork.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;