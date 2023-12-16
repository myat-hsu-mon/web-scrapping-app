import express from "express";
import { Pool } from "pg";

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: "myat",
  host: "localhost",
  database: "web-scrapping",
  port: 5432,
});

app.get("/", (req, res) => res.json({ message: "hello world" }));
app.listen(port, () => {
  console.log(`App is listening...`);
});

export default app;
