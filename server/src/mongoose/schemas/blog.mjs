import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
