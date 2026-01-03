import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/api";
import ContactCard from "./ContactCard";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await getContacts();
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts(contacts.filter((c) => c._id !== id));
  };

  if (loading) return <p>Loading contacts...</p>;
  if (contacts.length === 0) return <p>No contacts found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contacts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
