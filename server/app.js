import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Food Delivery API Running.",
  });
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

export default app;