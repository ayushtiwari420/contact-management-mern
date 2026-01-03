import { useNavigate } from "react-router-dom";

function Account({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
  <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 w-full max-w-md border border-white relative overflow-hidden">
    
    {/* Decorative Background Element */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

    <div className="relative pt-8 text-center">
      {/* Profile Avatar */}
      <div className="mx-auto w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-blue-600 border-4 border-white mb-4">
        {user?.name?.charAt(0) || 'U'}
      </div>

      <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Account Details</h2>
      <p className="text-slate-500 text-sm mb-8">Manage your personal information</p>

      {/* Information Cards */}
      <div className="space-y-3 text-left">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
          <p className="text-slate-700 font-semibold">{user.name}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
          <p className="text-slate-700 font-semibold">{user.email}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
          <p className="text-slate-700 font-semibold">{user.phone}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <p className="text-slate-700 font-semibold">••••••••</p>
          </div>
          <button className="text-xs text-blue-600 font-bold hover:underline">Change</button>
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={logout}
        className="w-full mt-10 bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 hover:border-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign Out
      </button>
    </div>
  </div>
</div>
  );
}

export default Account;
