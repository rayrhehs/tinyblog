import express from "express";
import cors from "cors";
import { mockBlogs } from "./utils/constants.mjs";
import { Blog } from "./mongoose/schemas/blog.mjs";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// setting up mongoose
mongoose
  .connect("mongodb://localhost/tinyblog") // <-- tinyblog collection was created in mongodb compass once i add an element
  .then(() => console.log("Connected to Database!"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cors());

// test route
app.get("/", (request, response) => {
  response.send("Welcome to TinyBlog!").status(200);
});

// get entries from database
app.get("/api/blog/home", async (request, response) => {
  Blog.find()
    .then((blogs) => response.json(blogs))
    .catch((err) => response.json(err));
});

// add entries to database
app.post("/api/blog/add", async (request, response) => {
  // destructure body from request
  const { body } = request;
  const data = body;
  // create date
  const currentDay = new Date().toISOString().split("T")[0];

  // generate blog date
  data.date = currentDay;
  const newBlog = new Blog(data);

  // save blog to database
  try {
    const savedBlog = await newBlog.save();
    return response.status(201).send({ savedBlog });
  } catch {
    console.log("Entry does not match database requirements.");
    return response.sendStatus(400);
  }
});

app.listen(PORT, console.log(`Running Express Server on ${PORT}`));
