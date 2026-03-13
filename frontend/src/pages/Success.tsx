import { CheckCircle, Share2, CornerUpLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function Success() {
  const { id } = useParams();

  return (
    <div className="w-full max-w-md mx-auto text-center mt-20 px-4">
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse absolute top-0 left-0" />
          <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
        </div>
      </div>
      
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500 mb-6">
        Delivered!
      </h2>
      
      <div className="glass-card rounded-2xl p-6 mb-8 text-left shadow-lg">
        <p className="text-gray-600 mb-4 text-center">Your anonymous message is flying through the interwebs to its destination right now.</p>
        
        <div className="bg-white/60 p-4 rounded-xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-white/80 transition" onClick={() => {
            navigator.clipboard.writeText(id || '');
            alert('ID Copied!');
          }}>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Secret Tracking ID</p>
            <p className="text-gray-900 font-mono font-medium">{id}</p>
          </div>
          <Share2 className="text-primary-500 group-hover:scale-110 transition-transform w-5 h-5" />
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-3">Click ID to copy. Note: We do not store any identifying info.</p>
      </div>

      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-200"
      >
        <CornerUpLeft className="w-5 h-5 text-primary-500" />
        Send Another
      </Link>
    </div>
  );
}
