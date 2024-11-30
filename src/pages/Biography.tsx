import React from 'react';
import { motion } from 'framer-motion';

const Biography: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-serif text-4xl mb-8 text-center"
      >
        Biographie
      </motion.h1>

      <div className="space-y-12">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
            alt="Jean Pierre Jolibert dans son atelier"
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        </div>

        <section className="prose prose-lg max-w-none">
          <p>
            Jean Pierre Jolibert, né en 1960 à Paris, est un artiste peintre contemporain
            dont le travail est reconnu pour sa capacité à transcender les frontières
            entre l'abstrait et le figuratif.
          </p>

          <h2 className="font-serif text-2xl mt-8 mb-4">Parcours Artistique</h2>
          <p>
            Formé aux Beaux-Arts de Paris dans les années 1980, Jean Pierre Jolibert
            développe rapidement un style unique qui lui permet de se démarquer sur
            la scène artistique internationale.
          </p>

          <h2 className="font-serif text-2xl mt-8 mb-4">Influences et Style</h2>
          <p>
            Son travail est profondément influencé par les grands maîtres de
            l'abstraction lyrique, tout en maintenant un dialogue constant avec
            la tradition picturale classique.
          </p>

          <h2 className="font-serif text-2xl mt-8 mb-4">Expositions Majeures</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>2023 - Galerie Nationale d'Art Moderne, Paris</li>
            <li>2022 - Biennale d'Art Contemporain, Venise</li>
            <li>2021 - Museum of Modern Art, New York</li>
            <li>2020 - Tate Modern, Londres</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Biography;