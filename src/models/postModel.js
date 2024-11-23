import 'dotenv/config';
import { ObjectId } from "mongodb";
import connectToDatabase from "../config/dbConfig.js";


let connection;

async function getConnection() {
  if (!connection) {
    connection = await connectToDatabase(process.env.CONNECTION_STRING);
  }
  return connection;
}

export async function getAllPosts() {
  const db = (await getConnection()).db("insta-like");
  const collection = db.collection("posts");

  return collection.find().toArray();
}

export async function createPost(newPost) {
  const db = (await getConnection()).db("insta-like");
  const collection = db.collection("posts");

  return collection.insertOne(newPost);
}

export async function updatePost(id, updatedPost) {
  const db = (await getConnection()).db("insta-like");
  const collection = db.collection("posts");

  const objID = new ObjectId(id);

  return collection.updateOne(
    { _id: objID },
    { $set: updatedPost }
  );
}
