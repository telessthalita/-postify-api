import { MongoClient } from "mongodb";

export default async function connectToDatabase(connectionString) {
  if (!connectionString) {
    throw new Error("Connection string not provided.");
  }

  const client = new MongoClient(connectionString); 

  await client.connect(); 
  console.log("Successfully connected to the database!");

  return client; 
}
