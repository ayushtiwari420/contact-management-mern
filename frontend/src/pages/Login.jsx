import API from "../services/api";

function Login({ setUser }) {
  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 px-4">
  <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white">
    {/* Header Section */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h2>
      <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in</p>
    </div>

    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase ml-1">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="name@company.com"
          required
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase ml-1">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transform active:scale-[0.98] transition-all duration-150 mt-2"
      >
        Sign In
      </button>
    </form>

    {/* Footer Link */}
    <div className="mt-8 text-center">
      <p className="text-sm text-slate-600">
        New here? <a href="/register" className="text-blue-600 font-semibold hover:underline">Create an account</a>
      </p>
    </div>
  </div>
</div>
  );
}

export default Login;
