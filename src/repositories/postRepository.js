import Post from "../models/Post.js";

class PostRepository {
    async create(post) {
        return await Post.create(post);
    }

    async findAll() {
        return await Post.find().populate("user");
    }

    async findByUser(userId) {
        return await Post.find({ user: userId }).populate("user");
    }

    async update(postId, postData) {
        return await Post.findByIdAndUpdate(postId, postData, { new: true });
    }

    async delete(postId) {
        return await Post.findByIdAndDelete(postId);
    }
    async findById(id) {
    return await Post.findById(id).populate("user");
}
}

export default new PostRepository();