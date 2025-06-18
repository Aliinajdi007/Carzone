
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, isAdmin, loading } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Cars", href: "/cars" },
    { name: "Contact", href: "/contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold automotive-gradient bg-clip-text text-transparent">
                CarZone
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-automotive-blue border-b-2 border-automotive-blue"
                    : "text-gray-700 hover:text-automotive-blue"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {!loading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-automotive-blue"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {profile?.full_name || user.email}
                      </span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4 inline mr-2" />
                          Admin Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="h-4 w-4 inline mr-2" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-automotive-blue hover:bg-automotive-blue-light">
                      Admin Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-automotive-blue"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  location.pathname === item.href
                    ? "text-automotive-blue bg-automotive-gray-warm"
                    : "text-gray-700 hover:text-automotive-blue hover:bg-automotive-gray-warm"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {!loading && (
              <>
                {user ? (
                  <div className="border-t pt-3">
                    <div className="px-3 py-2 text-sm text-gray-700">
                      {profile?.full_name || user.email}
                    </div>
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-automotive-blue hover:bg-automotive-gray-warm"
                    >
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-automotive-blue hover:bg-automotive-gray-warm"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-3">
                    <Link
                      to="/auth"
                      className="block px-3 py-2 text-base font-medium text-automotive-blue hover:bg-automotive-gray-warm"
                    >
                      Admin Sign In
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
