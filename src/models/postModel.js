import mongoose from 'mongoose';

// Define o esquema para um post
const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}(?:\/[^\s]*)?$/, // Valida a URL da imagem
    },
    createdAt: {
        type: Date,
        default: Date.now, // A data de criação é gerada automaticamente
    },
});

// Cria o modelo a partir do esquema definido
const Post = mongoose.model('Post', postSchema);

export default Post;
 