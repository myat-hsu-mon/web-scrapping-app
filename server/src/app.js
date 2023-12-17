const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./db.js");

const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes.js");
const keywordRoutes = require("./routes/keywordRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

//middlewares
app.use(express.json());

//database
sequelize
  .authenticate()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB Connection Error: ", err));

app.use("/api/v1/auth", authRoutes);
// authentication middleware
app.use("/api/v1/keywords", keywordRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`App is listening...`);
});

module.exports = app;
