import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-6 z-50 relative bg-transparent">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg group-hover:shadow-primary-300/50 transition-all duration-300">
          <Heart className="text-white w-5 h-5 fill-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">KindSecret</h1>
          <p className="text-xs text-gray-500 font-medium">Share kindness anonymously.</p>
        </div>
      </Link>
    </header>
  );
}
