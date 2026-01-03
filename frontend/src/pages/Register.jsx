import API from "../services/api";

function Register({ setUser }) {
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const { data } = await API.post("/auth/register", {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.password.value,
      });

      localStorage.setItem("token", data.token);
      setUser(data);
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 px-4 py-10">
  <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-white">
    {/* Header Section */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create Account</h2>
      <p className="text-slate-500 mt-2 text-sm">Join us to start managing your contacts</p>
    </div>

    <form onSubmit={handleRegister} className="space-y-4">
      {/* Name Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase ml-1">Full Name</label>
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          required
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase ml-1">Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Phone Input */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase ml-1">Phone Number</label>
        <input
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          required
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
          className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transform active:scale-[0.98] transition-all duration-150 mt-4"
      >
        Get Started
      </button>
    </form>

    {/* Footer Link */}
    <div className="mt-8 text-center">
      <p className="text-sm text-slate-600">
        Already have an account? <a href="/login" className="text-emerald-600 font-semibold hover:underline">Sign in</a>
      </p>
    </div>
  </div>
</div>
  );
}

export default Register;
