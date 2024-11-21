import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}(?:\/[^\s]*)?$/, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
 