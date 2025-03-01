import express, { Express } from "express";  // Import Express type
import cors from "cors";
import bodyParser from "body-parser";
import apiRoutes from "./routes/apiRoutes";

// Initialize Express app with the correct type
const app: Express = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api", apiRoutes);




// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
