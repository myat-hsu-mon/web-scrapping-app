const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./db.js");

const app = express();
const port = process.env.PORT || 4000;

const authRoutes = require("./routes/authRoutes.js");
const keywordRoutes = require("./routes/keywordRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

const { protect } = require("./controllers/authController.js");

//middlewares
app.use(cors());
app.use(express.json());

//database
sequelize
  .authenticate()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB Connection Error: ", err));

app.use("/api/v1/auths", authRoutes);
app.use("/api/v1/keywords", protect, keywordRoutes);
app.use("/api/v1/uploads", protect, uploadRoutes);

app.listen(port, () => {
  console.log(`App is listening...`);
});

module.exports = app;
