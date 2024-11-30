import React, { useState, useRef } from 'react';
import { useArtworkStore } from '../store/useArtworkStore';
import { Plus, Trash2, LogOut, Upload } from 'lucide-react';
import { Artwork } from '../types/artwork';

const Admin: React.FC = () => {
  const { isAuthenticated, login, logout, artworks, addArtwork, removeArtwork } =
    useArtworkStore();
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newArtwork, setNewArtwork] = useState<Omit<Artwork, 'id'>>({
    title: '',
    year: new Date().getFullYear(),
    dimensions: '',
    technique: '',
    imageUrl: '',
    category: '',
    description: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(password);
    setPassword('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setNewArtwork(prev => ({ ...prev, imageUrl: fileUrl }));
    }
  };

  const handleAddArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Veuillez sélectionner une image');
      return;
    }

    await addArtwork(newArtwork, selectedFile);
    
    setNewArtwork({
      title: '',
      year: new Date().getFullYear(),
      dimensions: '',
      technique: '',
      imageUrl: '',
      category: '',
      description: '',
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div>
            <h2 className="text-3xl font-serif text-center mb-8">
              Administration
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl">Administration</h1>
        <button
          onClick={logout}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Déconnexion
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-serif mb-8">Ajouter une œuvre</h2>
        <form onSubmit={handleAddArtwork} className="space-y-8">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  {newArtwork.imageUrl ? (
                    <div className="relative">
                      <img
                        src={newArtwork.imageUrl}
                        alt="Aperçu"
                        className="mx-auto h-64 w-auto object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setNewArtwork(prev => ({ ...prev, imageUrl: '' }));
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="p-8">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 mt-4">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700"
                        >
                          <span className="text-base">Télécharger une image</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            ref={fileInputRef}
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, GIF jusqu'à 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                required
                value={newArtwork.title}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Titre de l'œuvre"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                required
                value={newArtwork.category}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, category: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="Catégorie de l'œuvre"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Année
              </label>
              <input
                type="number"
                required
                value={newArtwork.year}
                onChange={(e) =>
                  setNewArtwork({
                    ...newArtwork,
                    year: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dimensions
              </label>
              <input
                type="text"
                required
                value={newArtwork.dimensions}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, dimensions: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="ex: 100x80cm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technique
              </label>
              <input
                type="text"
                required
                value={newArtwork.technique}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, technique: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                placeholder="ex: Huile sur toile"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newArtwork.description}
              onChange={(e) =>
                setNewArtwork({ ...newArtwork, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
              placeholder="Description de l'œuvre..."
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter l'œuvre
          </button>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-serif mb-8">Œuvres existantes</h2>
        <div className="space-y-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-medium">{artwork.title}</h3>
                  <p className="text-gray-500">
                    {artwork.technique}, {artwork.dimensions}, {artwork.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeArtwork(artwork.id, artwork.imageUrl)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                title="Supprimer l'œuvre"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;