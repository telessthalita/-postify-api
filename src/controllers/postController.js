// Importando a função de conexão com o banco
import connectToDatabase from "../config/dbconfig.js";

let db;

// Função de inicialização da conexão com o MongoDB
async function initializeDB() {
  const client = await connectToDatabase(process.env.CONNECTION_STRING);
  db = client.db("insta-likes"); // Defina o nome do banco de dados
}

// Função para buscar todos os posts do banco
export async function getAllPosts() {
  try {
    const collection = db.collection("posts"); // Obtém a coleção de posts
    const posts = await collection.find().toArray(); // Busca todos os posts
    return posts;
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
}

// Função para buscar um post por ID
export async function getPostById(id) {
  try {
    const collection = db.collection("posts");
    const post = await collection.findOne({ _id: new MongoClient.ObjectId(id) }); // Busca post pelo ID
    return post;
  } catch (error) {
    throw new Error("Error fetching post by ID: " + error.message);
  }
}

// Inicializa a conexão com o banco quando o módulo for carregado
initializeDB();

