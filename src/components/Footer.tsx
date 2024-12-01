import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useArtworkStore } from '../store/useArtworkStore';

const Footer: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const login = useArtworkStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      setShowModal(false);
      setPassword('');
      navigate('/admin');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  return (
    <footer className="mt-auto py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex-1 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Jean Pierre Jolibert. Tous droits réservés.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Administration"
        >
          <Lock className="h-5 w-5" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-serif mb-4">Accès administrateur</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-3 py-2 border rounded-md mb-4"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;