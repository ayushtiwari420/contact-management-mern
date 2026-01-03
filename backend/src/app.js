import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";


const app = express();



/* Global middleware */
app.use(cors());
app.use(express.json());

/* Routes */

app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);


/* Health check */
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
