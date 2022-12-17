const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    // postedAt: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Full Stack Developer"],
      default: "Full Stack Developer",
    },
    level: {
      type: String,
      required: true,
      enum: ["Junior", "Senior", "Manager"],
      default: "Junior",
    },
    contract: {
      type: String,
      required: true,
      enum: ["Full Time", "Part Time"],
      default: "Full Time",
    },
    position: {
      type: String,
      required: true,
      enum: [
        "Backend Developer",
        "Junior Frontend Developer",
        "Junior Backend Developer",
        "FSD",
      ],
      default: "Junior Frontend Developer",
    },
    language: { type: String, required: true },
  },

  { timestamps: true }
);

const JobPost = mongoose.model("jobpost", jobPostSchema);

module.exports = JobPost;
