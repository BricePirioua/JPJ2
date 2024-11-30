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
      
      // Créer une URL temporaire pour l'aperçu
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
    
    // Réinitialiser le formulaire
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
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-serif">
              Administration
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Se connecter
              </button>
            </div>
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
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-serif mb-4">Ajouter une œuvre</h2>
        <form onSubmit={handleAddArtwork} className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {newArtwork.imageUrl ? (
                      <div className="relative">
                        <img
                          src={newArtwork.imageUrl}
                          alt="Aperçu"
                          className="mx-auto h-64 w-auto object-contain"
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
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700"
                          >
                            <span>Télécharger une image</span>
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
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF jusqu'à 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                required
                value={newArtwork.title}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dimensions
                </label>
                <input
                  type="text"
                  required
                  value={newArtwork.dimensions}
                  onChange={(e) =>
                    setNewArtwork({ ...newArtwork, dimensions: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Technique
                </label>
                <input
                  type="text"
                  required
                  value={newArtwork.technique}
                  onChange={(e) =>
                    setNewArtwork({ ...newArtwork, technique: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <input
                type="text"
                required
                value={newArtwork.category}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newArtwork.description}
                onChange={(e) =>
                  setNewArtwork({ ...newArtwork, description: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-serif mb-4">Œuvres existantes</h2>
        <div className="grid grid-cols-1 gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{artwork.title}</h3>
                  <p className="text-sm text-gray-500">
                    {artwork.technique}, {artwork.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeArtwork(artwork.id, artwork.imageUrl)}
                className="text-red-600 hover:text-red-800"
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