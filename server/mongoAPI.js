import mongoose from 'mongoose';

// Configure dotenv to load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URL;

// Ensure uri is defined
if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
}

// Establish connection to MongoDB
mongoose.connect(uri);

// Define the schema for the 'comment' collection
const commentSchema = new mongoose.Schema({
    message: String
});

// Create a Mongoose model based on the schema
const Comment = mongoose.model('Comment', commentSchema);

// Function to insert a message into the 'comment' collection
export async function insertMessage(message) {
    try {
        const newComment = new Comment({ message });
        const result = await newComment.save();
        console.log("Insert Result:", result);
    } catch (error) {
        console.error("Error inserting message:", error);
    }
}

// Function to remove a message from the 'comment' collection by ID
export async function removeMessage(idMessage) {
    try {
        const result = await Comment.deleteOne({ _id: idMessage });
        console.log("Delete Result:", result);
    } catch (error) {
        console.error("Error removing message:", error);
    }
}

// Function to remove all messages from the 'comment' collection
export async function removeAllMessage() {
    try {
        const result = await Comment.deleteMany({});
        console.log("Delete Result:", result);
    } catch (error) {
        console.error("Error removing all messages:", error);
    }
}

// Function to get all messages from the 'comment' collection
export async function getAllMessage() {
    try {
        const allMessages = await Comment.find();
        return allMessages;
    } catch (error) {
        console.error("Error getting all messages:", error);
        return [];
    }
}
