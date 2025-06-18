import { Car } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-automotive-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-automotive-orange" />
              <span className="text-2xl font-bold">CarZone</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect vehicle. We offer quality cars, 
              competitive prices, and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-automotive-orange transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-automotive-orange transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-automotive-orange transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-automotive-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-automotive-orange transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-automotive-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-automotive-orange transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Srifa, South Lebanon</li>
              <li>Phone: +961 71 862 750</li>
              <li>Email: alijihadnajdi14@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Ali Najdi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
