const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

// middleswares
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Laptop Deals server is running on port ==>", port);
});
