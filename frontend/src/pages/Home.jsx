import { useEffect, useState } from "react";
import API from "../services/api";

function Home({ user }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 6;

  /* ================= FETCH CONTACTS ================= */
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await API.get("/api/contacts");
        setContacts(data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchContacts();
  }, []);

  /* ================= CREATE CONTACT ================= */
  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const { data } = await API.post("/api/contacts", {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
      });

      setContacts([data, ...contacts]);
      form.reset();
    } catch (error) {
      console.error("Create Error:", error);
      alert("Failed to add contact");
    }
  };

  /* ================= DELETE CONTACT ================= */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete contact");
    }
  };

  /* ================= SEARCH + PAGINATION ================= */
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;

  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(
    filteredContacts.length / contactsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900">
              👋 Welcome,{" "}
              <span className="text-blue-600">
                {user?.name}
              </span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* FORM */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-8 rounded-2xl shadow">

                <h3 className="text-xl font-bold mb-6">
                  New Contact
                </h3>

                <form
                  onSubmit={handleCreate}
                  className="space-y-4"
                >

                  <input
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded"
                  />

                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full p-3 border rounded"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700"
                  >
                    Add Contact
                  </button>

                </form>
              </div>
            </div>

            {/* CONTACT LIST */}
            <div className="w-full lg:w-2/3">

              <div className="bg-white rounded-2xl shadow p-6">

                {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full mb-6 p-3 border rounded"
                />

                {/* CONTACTS */}
                {currentContacts.length === 0 ? (
                  <p className="text-center text-gray-400">
                    No contacts found
                  </p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">

                    {currentContacts.map((c) => (
                      <div
                        key={c._id}
                        className="border p-4 rounded flex justify-between items-center"
                      >

                        <div>
                          <h4 className="font-bold">
                            {c.name}
                          </h4>
                          <p>{c.phone}</p>
                          <p className="text-sm text-gray-400">
                            {c.email || "No Email"}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-500 font-bold hover:text-red-700"
                        >
                          Delete
                        </button>

                      </div>
                    ))}

                  </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-between mt-6">

                    <button
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((p) => p - 1)
                      }
                      className="px-4 py-2 border rounded disabled:opacity-40"
                    >
                      Prev
                    </button>

                    <span>
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((p) => p + 1)
                      }
                      className="px-4 py-2 border rounded disabled:opacity-40"
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
