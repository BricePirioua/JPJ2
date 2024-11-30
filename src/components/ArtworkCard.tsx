import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/gallery/${artwork.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white">
            <h3 className="font-serif text-lg">{artwork.title}</h3>
            <p className="text-sm opacity-90">{artwork.year}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;