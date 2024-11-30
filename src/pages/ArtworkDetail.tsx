import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { useArtworkStore } from '../store/useArtworkStore';

const ArtworkDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLightbox, setShowLightbox] = useState(false);
  const artwork = useArtworkStore((state) => 
    state.artworks.find((a) => a.id === id)
  );

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Œuvre non trouvée</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/gallery')}
        className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour à la galerie
      </button>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative">
          <motion.img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full rounded-lg shadow-lg cursor-zoom-in"
            onClick={() => setShowLightbox(true)}
            whileHover={{ scale: 1.02 }}
          />
          <button
            onClick={() => setShowLightbox(true)}
            className="absolute bottom-4 right-4 p-2 bg-white/80 rounded-full shadow-lg"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="font-serif text-4xl mb-4">{artwork.title}</h1>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">Détails</h2>
              <dl className="grid grid-cols-2 gap-2">
                <dt className="text-gray-600">Année</dt>
                <dd>{artwork.year}</dd>
                <dt className="text-gray-600">Dimensions</dt>
                <dd>{artwork.dimensions}</dd>
                <dt className="text-gray-600">Technique</dt>
                <dd>{artwork.technique}</dd>
                <dt className="text-gray-600">Catégorie</dt>
                <dd className="capitalize">{artwork.category}</dd>
              </dl>
            </div>
            {artwork.description && (
              <div>
                <h2 className="text-lg font-medium mb-2">Description</h2>
                <p className="text-gray-600">{artwork.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;