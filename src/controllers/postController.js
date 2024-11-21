import { MongoClient, ObjectId } from "mongodb"; 
import connectToDatabase from "../config/dbconfig.js";

let db; 

async function initializeDB() {
  try {
    const client = await connectToDatabase(process.env.CONNECTION_STRING);
    db = client.db("insta-likes");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  }
}


export async function getAllPosts() {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDB first.");
  }
  try {
    const collection = db.collection("posts");
    const posts = await collection.find().toArray();
    return posts;
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
}

export async function getPostById(id) {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDB first.");
  }
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const collection = db.collection("posts");
    const post = await collection.findOne({ _id: new ObjectId(id) });
    return post || null; 
  } catch (error) {
    throw new Error("Error fetching post by ID: " + error.message);
  }
}

export async function newPost(req, res) {
  if (!db) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  const newPost = req.body;

  if (!newPost || Object.keys(newPost).length === 0) {
    return res.status(400).json({ error: "Invalid or missing post data" });
  }

  try {
    const collection = db.collection("posts");
    const result = await collection.insertOne(newPost);
    return res.status(201).json({ id: result.insertedId, ...newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Failed to create post", details: error.message });
  }
}

initializeDB().catch((error) => {
  console.error("Failed to initialize database:", error);
});
