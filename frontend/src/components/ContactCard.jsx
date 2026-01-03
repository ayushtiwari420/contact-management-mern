function ContactCard({ contact, onDelete }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{contact.name}</h3>

      <p className="text-sm text-gray-600">{contact.email}</p>
      <p className="text-sm text-gray-600">{contact.phone}</p>

      {contact.message && (
        <p className="text-sm mt-2 text-gray-700 line-clamp-2">
          {contact.message}
        </p>
      )}

      <button
        onClick={() => onDelete(contact._id)}
        className="mt-3 text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}

export default ContactCard;
