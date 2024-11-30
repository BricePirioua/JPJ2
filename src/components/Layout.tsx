import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Palette, Home, User, Mail, Image, Menu, X } from 'lucide-react';
import AdminLock from './AdminLock';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-gray-900" />
                <span className="font-serif text-xl">Jean Pierre Jolibert</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Accueil" />
              <NavLink to="/gallery" icon={<Image className="h-4 w-4" />} text="Galerie" />
              <NavLink to="/biography" icon={<User className="h-4 w-4" />} text="Biographie" />
              <NavLink to="/contact" icon={<Mail className="h-4 w-4" />} text="Contact" />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink
                to="/"
                icon={<Home className="h-4 w-4" />}
                text="Accueil"
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink
                to="/gallery"
                icon={<Image className="h-4 w-4" />}
                text="Galerie"
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink
                to="/biography"
                icon={<User className="h-4 w-4" />}
                text="Biographie"
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink
                to="/contact"
                icon={<Mail className="h-4 w-4" />}
                text="Contact"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Jean Pierre Jolibert. Tous droits réservés.
          </p>
        </div>
      </footer>

      <AdminLock />
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

export default Layout;