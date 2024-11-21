import express from "express";
import routes from "./src/routes/postsRoutes.js";
import connectToDatabase from "./src/config/dbconfig.js";

await connectToDatabase(process.env.CONNECTION_STRING);

const app = express();
app.use(express.json());

routes(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
