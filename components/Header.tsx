import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          이차함수 허브
        </Link>
        <nav>
          <Link 
            to="/" 
            className="text-slate-600 hover:text-blue-500 font-medium transition-colors duration-300"
          >
            홈
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;