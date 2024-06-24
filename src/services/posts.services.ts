import { posts, Post, PostsModels } from "../models/posts";

export class PostsServices {

    static instance?: PostsServices;

    private constructor(private posts: PostsModels) { }

    static getInstance(postsModels: PostsModels) {
        if (this.instance) return this.instance;
        else {
            this.instance = new PostsServices(postsModels);
            return this.instance;
        }
    }

    async getAll() {
        return this.posts.getAll();
    }

    async createOne(post: Omit<Post, "id">) {
        return this.posts.createOne(post);
    }

    async updateOne(post: Omit<Post, "date">) {
        return this.posts.update(post);
    }

    async deleteOne(id: number) {
        return this.posts.deleteOne(id);
    }

    async getOne(id: number) {
        return this.posts.getOne(id);
    }
}
