import { getAllPosts, getPostById, newPost } from "../controllers/postController.js";

const routes = (app) => {
  app.get("/posts", async (req, res) => {
    try {
      const posts = await getAllPosts(); 
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving posts", error: error.message });
    }
  });

  app.get("/posts/:id", async (req, res) => {
    try {
      const post = await getPostById(req.params.id); 
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving post", error: error.message });
    }
  });

  app.post("/posts", async (req, res) => {
    try {
      await newPost(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error: error.message });
    }
  });
};

export default routes;
