import { useEffect, useState } from "react";
import API from "../services/api";

function Home({ user }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 6; // Changed to 6 for a better 2x3 grid layout

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await API.get("/contacts");
        setContacts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);

  /* ================= CREATE CONTACT ================= */
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const { data } = await API.post("/contacts", {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
      });

      setContacts([data, ...contacts]);
      form.reset();
    } catch (error) {
      alert("Failed to add contact");
    }
  };

  /* ================= DELETE CONTACT ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/contacts/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  /* ================= SEARCH + PAGINATION LOGIC ================= */
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              👋 Welcome, <span className="text-blue-600">{user?.name}</span>
            </h2>
            <p className="text-slate-500 mt-2 text-lg font-medium">
              Manage and organize your contact directory with ease.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* LEFT: PREMIUM CONTACT FORM */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                   New Connection
                </h3>

                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                    <input name="name" placeholder="John Doe" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
                    <input name="email" type="email" placeholder="john@example.com" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Phone</label>
                    <input name="phone" placeholder="+1 234 567 890" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" required />
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-all">
                    Create Contact
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT: PROFESSIONAL CONTACT DIRECTORY */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden flex flex-col h-full">
                
                {/* LIST HEADER */}
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    Contacts Directory
                  </h3>
                  <div className="relative w-full md:w-80 group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search by name or phone..."
                      value={searchTerm}
                      onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-grow p-6">
                  {filteredContacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-4xl">🔍</div>
                      <p className="text-lg font-bold text-slate-800">No matches found</p>
                      <p className="text-sm text-slate-400">Try refining your search keywords.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentContacts.map((c) => (
                        <div key={c._id} className="group p-5 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden">
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{c.name}</h4>
                              <p className="text-sm text-slate-500 font-medium">{c.phone}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                             <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                                {c.email || "No Email"}
                             </div>
                             <button onClick={() => handleDelete(c._id)} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PAGINATION FOOTER */}
                {totalPages > 1 && (
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                    >
                      Previous
                    </button>
                    
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Page <span className="text-blue-600">{currentPage}</span> of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-30 transition-all"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;