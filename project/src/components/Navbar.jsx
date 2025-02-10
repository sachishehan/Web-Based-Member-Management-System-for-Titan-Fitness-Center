import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">TITAN FITNESS</div>
        
        <ul className={`md:flex gap-8 items-center ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-white p-4 shadow-md md:shadow-none' : 'hidden md:flex'}`}>
          <li><a href="#home" className="text-lightGray hover:text-primary">Home</a></li>
          <li><a href="#about" className="text-lightGray hover:text-primary">About</a></li>
          <li><a href="#classes" className="text-lightGray hover:text-primary">Classes</a></li>
          <li><a href="#membership" className="text-lightGray hover:text-primary">Membership</a></li>
          <li><a href="#contact" className="text-lightGray hover:text-primary">Contact</a></li>
        </ul>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/signin"
            className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold hidden md:block"
          >
            Join Now
          </Link>
          <button className="md:hidden text-2xl" onClick={toggleMenu}>☰</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;