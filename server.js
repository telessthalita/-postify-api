import express from "express";
import routes from "./src/routes/postsRoutes.js";
import connectToDatabase from "./src/config/dbconfig.js";

const app = express();
app.use(express.static("uploads"))
routes(app)

async function startServer() {
  try {
    await connectToDatabase(process.env.CONNECTION_STRING); 

    app.use(express.json()); 

    routes(app); 

    app.listen(3000, () => {
      console.log("Server is listening on port 3000...");
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer(); 
