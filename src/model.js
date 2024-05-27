import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
	imageId: Number,
	userId: Number,
	content: String,
	edited: Boolean
}, { timestamps: { createdAt: true, updatedAt: false } });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
