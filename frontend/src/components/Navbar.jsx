import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* App Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            ContactHub
          </span>
        </Link>

        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{user ? user.name : 'Guest'}</p>
              <p className="text-xs text-slate-500">{user ? 'Active' : 'Not Signed In'}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>

          {/* Dropdown Menu */}
          {open && (
            <>
              {/* Invisible overlay to close dropdown */}
              <div className="fixed inset-0 z-0" onClick={() => setOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl z-10 py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                {!user ? (
                  <div className="px-2 space-y-1">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                      <span>Create Account</span>
                    </Link>
                  </div>
                ) : (
                  <div className="px-2 space-y-1">
                    <button
                      onClick={() => { setOpen(false); navigate("/account"); }}
                      className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      Account Settings
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
