import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    constructor() {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.renderCreate = this.renderCreate.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
    }

    async create(req, res) {
        try {
            const { userId } = req.params;
            const post = await postService.createPost(userId, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

   async getAll(req, res) {
    try {
        const posts = await postService.getPosts();
        const users = await userRepository.findAll(); // ← agrega esto
        const userId = users.length > 0 ? users[0]._id.toString() : "";
        res.render("posts", { posts, userId }); // ← pasa userId
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

    async renderCreate(req, res) {
        try {
            const { userId } = req.params;
            res.render("createPost", { userId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async renderEdit(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            if (!post) return res.status(404).send("Post no encontrado");
            res.render("editPost", { post });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            await postService.updatePost(req.params.id, req.body);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async renderDelete(req, res) {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).send("Post no encontrado");
        res.render("deletePost", { post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}

export default new PostController();