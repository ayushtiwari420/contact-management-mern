import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(cors({
    origin: 'https://contact-management-hub.netlify.app',
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
