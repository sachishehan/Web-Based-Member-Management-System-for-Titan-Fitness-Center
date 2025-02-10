import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">TITAN FITNESS</h3>
            <p className="text-gray-300">
              Transform your body and mind with our state-of-the-art facilities and expert trainers.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="#classes" className="text-gray-300 hover:text-white">Classes</a></li>
              <li><a href="#membership" className="text-gray-300 hover:text-white">Membership</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          {/* Social & Admin */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-2xl hover:text-primary">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-primary">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-primary">
                <FaTwitter />
              </a>
            </div>
            <Link 
              to="/admin/login"
              className="inline-block px-6 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-secondary transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-600 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Titan Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;