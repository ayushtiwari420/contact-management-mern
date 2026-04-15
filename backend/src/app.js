import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'https://contact-management-hub.netlify.app',
    credentials: true
}));
app.use(express.json());

/* UPDATED ROUTES WITH /API PREFIX */
app.use("/api/auth", authRoutes);       // Changed from /auth
app.use("/api/contacts", contactRoutes); // Changed from /contacts

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
