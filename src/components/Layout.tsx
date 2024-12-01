import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Image, User, Mail, Menu, X, Palette } from 'lucide-react';
import Footer from './Footer';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'text-accent-600 bg-accent-50'
          : 'text-primary-600 hover:text-accent-500 hover:bg-primary-50'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-accent-500" />
                <span className="font-serif text-xl text-primary-900">
                  Jean Pierre Jolibert
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Accueil" />
              <NavLink
                to="/gallery"
                icon={<Image className="h-4 w-4" />}
                text="Galerie"
              />
              <NavLink
                to="/biography"
                icon={<User className="h-4 w-4" />}
                text="Biographie"
              />
              <NavLink
                to="/contact"
                icon={<Mail className="h-4 w-4" />}
                text="Contact"
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-primary-600 hover:text-accent-500 hover:bg-primary-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/" icon={<Home className="h-4 w-4" />} text="Accueil" />
              <NavLink
                to="/gallery"
                icon={<Image className="h-4 w-4" />}
                text="Galerie"
              />
              <NavLink
                to="/biography"
                icon={<User className="h-4 w-4" />}
                text="Biographie"
              />
              <NavLink
                to="/contact"
                icon={<Mail className="h-4 w-4" />}
                text="Contact"
              />
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;