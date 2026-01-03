import Contact from "../models/Contact.model.js";

/* ================= CREATE CONTACT ================= */
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const contact = await Contact.create({
      user: req.user._id, // comes from auth middleware
      name,
      email,
      phone,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET USER CONTACTS ================= */
export const getContacts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalContacts = await Contact.countDocuments({
      user: req.user.id,
    });

    const contacts = await Contact.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      contacts,
      currentPage: page,
      totalPages: Math.ceil(totalContacts / limit),
      totalContacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= DELETE CONTACT ================= */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Check ownership
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await contact.deleteOne();

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
