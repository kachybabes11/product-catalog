import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"


const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("/{*splat}", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"))
  );
}

connectDB().then(() =>
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }),
);
