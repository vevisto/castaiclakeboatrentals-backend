
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    tags: [String],
    date: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Article = mongoose.model('Article', articleSchema);