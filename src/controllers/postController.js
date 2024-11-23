import { getAllPosts, createPost, updatePost as updatePostInDatabase } from "../models/postModel.js";
import fs from "fs";
import generateDescriptionWithGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function createNewPost(req, res) {
  const newPost = req.body;
  try {
    const createdPost = await createPost(newPost);  
    res.status(200).json(createdPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Request failed" });
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    description: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    const createdPost = await createPost(newPost);  
    const updatedImagePath = `uploads/${createdPost.insertedId}.png`;
    fs.renameSync(req.file.path, updatedImagePath);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Request failed" });
  }
}


export async function updatePost(req, res) {
  const id = req.params.id;
  const imageUrl = `http://localhost:3000/${id}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateDescriptionWithGemini(imageBuffer);
    const post = {
      imgUrl: imageUrl,
      description: description,
      alt: req.body.alt
    };
    const updatedPost = await updatePostInDatabase(id, post); 
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Request failed" });
  }
}
