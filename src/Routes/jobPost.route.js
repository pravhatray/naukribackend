const express = require("express");
const JobPost = require("../Models/jobPost.model");

const app = express.Router();

app.get("/search", async (req, res) => {
  let keyword = {};
  if (req.query.q) {
    keyword = req.query.q;
  }
  
  try {
    const Post = await JobPost.find({
      language: { $regex: keyword, $options: "i" },
    });
    console.log(Post);
    return res.status(200).send(Post);
  } catch (er) {
    return res.status(403).send(er.message);
  }
});

app.get("/filterRole", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const filterrole = await JobPost.find({ role: q });
    res.status(200).send(filterrole);
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

app.get("/sort/:type", async (req, res) => {
 const {type} =req.params;

 try{
  if(type==="dec")
  {
    let updated=await JobPost.find().sort({createdAt:-1});
    res.send(updated)
  }
  else if(type==="inc"){
    let updated=await JobPost.find().sort({createdAt:1});
    res.send(updated)
  }
 }catch(er){
  res.status(404).send(er.message)
 }
 
  
});


app.get("/", async (req, res) => {
  const { page = 1, limit = 3} = req.query;
  try {
    const alljobPost = await JobPost.find();
    const jobpost = await JobPost.find()
     
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.status(200).send({ jobpost, total: alljobPost });
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

app.get("/", async (req, res) => {
  let jobpost = await JobPost.find();
  res.send(jobpost);
});



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
