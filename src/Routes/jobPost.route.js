const express = require("express");
const JobPost = require("../Models/jobPost.model");

const app = express.Router();

app.get("/search", async (req, res) => {
  let keyword = {};
  if (req.query.q) {
    keyword = req.query.q;
  }
  console.log(keyword);
  try {
    const AllPost = await Post.find({
      language: { $regex: keyword, $options: "i" },
    });
    console.log(AllPost);
    return res.status(200).send(AllPost);
  } catch (er) {
    return res.status(403).send(er.message);
  }
});

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
