require("dotenv").config();
const express = require("express");
const app = express();
const Db = require("./db/dbConfig");
const user = require("./routes/user");
const product = require("./routes/product");
const cors = require("cors");
const PORT = process.env.PORT || 5500;

//cors error resolving
app.use(cors());

//body parser
app.use(express.json());

//including routess
app.use("/user-routes", user);
app.use("/product-routes", product);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
