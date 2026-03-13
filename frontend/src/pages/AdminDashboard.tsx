import { ShieldAlert, AlertTriangle, Activity } from 'lucide-react';

// For the MVP, we just render a static dashboard that mimics the required design
export default function AdminDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10">
      <div className="flex items-center gap-3 mb-10">
        <ShieldAlert className="w-8 h-8 text-gray-800" />
        <h2 className="text-3xl font-extrabold text-gray-900">Security Visibility Panel </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blue Level */}
        <div className="glass-card rounded-3xl p-6 border-l-8 border-l-blue-500 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-blue-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Blue Level</h3>
            <span className="ml-auto text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full font-bold">LOW RISK</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Normal usage, message sent, user visiting page. Log activity only.</p>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {/* Mock Data */}
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-900/50 font-mono mb-1">{new Date().toLocaleTimeString()} - IP HASH: {Math.random().toString(36).substring(7)}</p>
                <p className="text-sm text-gray-700 font-medium">Message sent successfully (Secret_ABC{i})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board */}
        <div className="glass-card rounded-3xl p-6 border-l-8 border-l-yellow-500 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-yellow-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Notice Board</h3>
            <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full font-bold">MED RISK</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Suspicious behavior but not dangerous. Needs manual review.</p>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {/* Mock Data */}
            <div className="bg-yellow-50/80 p-4 rounded-xl border border-yellow-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 group-hover:w-2 transition-all"></div>
              <p className="text-xs text-yellow-800/60 font-mono mb-2">{new Date().toLocaleTimeString()} - REPEATED IP</p>
              <p className="text-sm text-gray-800 font-bold mb-1">High frequency sending</p>
              <p className="text-xs text-gray-500">5 messages in 10 minutes from same hash.</p>
              <button className="mt-3 text-xs bg-white border border-yellow-300 text-yellow-700 px-3 py-1 rounded-md font-bold hover:bg-yellow-50 transition">Review Logs</button>
            </div>
          </div>
        </div>

        {/* Red Alerts */}
        <div className="glass-card rounded-3xl p-6 border-l-8 border-l-red-500 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="text-red-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-gray-800 whitespace-nowrap">Red Alerts</h3>
            <span className="ml-auto text-xs bg-red-100 text-red-800 py-1 px-2 rounded-full font-bold animate-pulse">CRITICAL</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Potential abuse or malicious activity. IP Blocking engaged.</p>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {/* Mock Data */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-red-500 font-bold pl-1 border-l-2 border-red-500">PROFANITY BOT EVENT</p>
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded">BLOCKED</span>
              </div>
              <p className="text-sm text-gray-800 font-bold mt-2">Harassment language threshold exceeded</p>
              <p className="text-xs text-gray-500 mt-1">IP auto-banned for 24h. Incident logged.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
