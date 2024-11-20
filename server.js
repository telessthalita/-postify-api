import express from "express";
import routes from "./src/routes/postsRoutes.js";
import connectToDatabase from "./src/config/dbconfig.js";

// Conecta ao MongoDB usando MongoClient
await connectToDatabase(process.env.CONNECTION_STRING);

const app = express();
app.use(express.json());

// Configura as rotas
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
