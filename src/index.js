const express = require("express");

const cors=require("cors")
const dbConnect = require("../src/config/db");
const jobPostRoute=require("./Routes/jobPost.route")


require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/jobs",jobPostRoute)





app.get("/", (req, res) => {
  res.send("Naukri leloo");
});

app.listen(PORT, async () => {
  await dbConnect()
  console.log(`server started at http://localhost:${PORT}`);
});
