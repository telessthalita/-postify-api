# Posts API 📝

API for managing posts, built with **Node.js**, **Express**, and **MongoDB**.

## 🛠 Technologies

- **Node.js**
- **Express**
- **MongoDB** (via MongoClient)
- **Multer** (for file uploads)

## ⚡ Features

- **GET /posts**: Returns all posts.
- **POST /posts**: Creates a new post.
- **POST /upload**: Uploads an image and creates a post with it.
- **PUT /upload/:id**: Updates a post with new text (generated from the image).

## 🛠 Testing with Thunder Client

1. **Install Thunder Client** in **Visual Studio Code**.
2. **Create Request**:
   - **GET /posts**: `http://localhost:3000/posts`
   - **POST /posts**: Send a JSON with the post data. Example:
     ```json
     {
       "description": "Post text",
       "imgUrl": "image.png",
       "alt": "Alternative text"
     }
     ```
   - **POST /upload**: Send an image via `form-data` with the field name `image`.
   - **PUT /upload/:id**: Send a JSON with post updates. Example:
     ```json
     {
       "alt": "New alternative text"
     }
     ```

