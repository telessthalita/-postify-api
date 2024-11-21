import { MongoClient } from 'mongodb';

let mongoClient;

export default async function connectToDatabase(connectionString) {
  if (!mongoClient) {
    try {
      console.log('Connecting to the database cluster...');
      mongoClient = new MongoClient(connectionString);

      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');
    } catch (error) {
      console.error('Failed to connect to the database!', error);
      process.exit(1); 
    }
  } else {
    console.log('Reusing existing database connection.');
  }

  return mongoClient;
}
