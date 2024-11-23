import express from "express";
import multer from "multer";
import cors from "cors";

import { updatePost, listPosts, createNewPost, uploadImage } from "../controllers/postController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200 
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  app.use(cors(corsOptions)); 
  app.use(express.json()); 

  app.get("/posts", listPosts);  
  app.post("/posts", createNewPost);  
  app.post("/upload", upload.single("image"), uploadImage);  
  app.put("/upload/:id", updatePost);  
};

export default routes;
