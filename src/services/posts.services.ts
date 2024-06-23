import { posts, Post } from "../models/posts";

class PostsServices {

    async getAll() {
        return posts.getAll();
    }
}

const postsServices = new PostsServices();