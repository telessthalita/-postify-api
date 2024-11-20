import { getAllPosts, getPostById } from "../controllers/postController.js";
import { ObjectId } from "mongodb";

// Funções de rota
const routes = (app) => {
  // Endpoint para retornar todos os posts
  app.get("/posts", async (req, res) => {
    try {
      const posts = await getAllPosts(); // Chama o controller para buscar todos os posts
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error: error.message });
    }
  });

  // Endpoint para retornar um post específico por ID
  app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const post = await getPostById(id); // Chama o controller para buscar o post pelo ID
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving post", error: error.message });
    }
  });
};

export default routes;
