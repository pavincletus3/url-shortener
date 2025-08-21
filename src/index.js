const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

const app = express();

// Allow all origins for dev (OK for testing, lock down for prod)
app.use(cors());

app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
