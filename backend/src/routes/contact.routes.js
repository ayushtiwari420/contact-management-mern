import express from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contact.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

/* All routes are protected */
router.post("/", protect, createContact);
router.get("/contacts", protect, getContacts);
router.delete("/:id", protect, deleteContact);

export default router;
