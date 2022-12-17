const express = require("express");
const JobPost = require("../Models/jobPost.model");

const app = express.Router();

// const Authmiddleware = async (req, res, next) => {
//   let token = req.headers.token;
//   if (token) {
//     let [id, email, password] = token.split(":");
//     let user = await User.findById(id);

//     if (user.email === email && user.password === password) {
//       next();
//     } else {
//       res.status(401).send("User is not authenticated check Credintials");
//     }
//   } else {
//     res.status(401).send("User is not authenticated check Credintials");
//   }
// };

// app.get("/:id", Authmiddleware, async (req, res) => {
//   try {
//     let id = req.params.id;
//     let profile = await User.findById(id);
//     res.status(200).send(profile);
//   } catch (e) {
//     res.status(401).send(e.message);
//   }
// });

app.get("/", async (req, res) => {
  let jobpost = await JobPost.find();
  res.send(jobpost);
});

app.get("/",async(req,res)=>{

  let {page=1,limit=10}=req.query
  try{
      let jobpost=await JobPost.find().skip((page-1)*limit).limit(limit)
      res.send(jobpost)
  }catch(e){
      res.status(500).send(e.message)
  }
})

app.post("/addjob", async (req, res) => {
  let { company,
    postedAt,
    city,
    location,
    role,
    level,
    contract,
    position,
    language } = req.body;
  try {
    let jobpost = await JobPost.create(req.body);
    res.send({
      token: `${jobpost.id}:${jobpost.company}:${jobpost.city}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.delete("/:id",async(req,res)=>{
  try {
    const id = req.params.id;
    let afterDelete = await ShopModel.findByIdAndDelete(id);
    return res.status(200).send(afterDelete);
} catch (e) {
    res.status(401).send(e.message);
}
})

module.exports = app;
