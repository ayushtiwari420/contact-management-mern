import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(cors({
  origin: "https://contact-management-hub.netlify.app", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204 
}));

app.use(express.json());

app.options('*', cors()); 

app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
