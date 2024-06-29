import { Table } from "./index";

export declare type Post = {
    id: number,
    title: string,
    description: string,
    body: string,
    date: string
}

class Posts extends Table {

    tableName: string = "posts";

    structure = [
        '\`id\` int NOT NULL AUTO_INCREMENT',
        '\`title\` varchar(150) NOT NULL',
        '\`description\` text(20000) NOT NULL',
        '\`body\` text(20000) NOT NULL',
        '\`date\` Date DEFAULT current_timestamp()',
        'PRIMARY KEY (\`id\`)'
    ]

    constructor() { super(); }

    async createOne(post: Omit<Post, "id">) {
        return new Promise((resolve, reject) => {
            this.query(`INSERT INTO ${this.tableName}(\`title\`, \`description\`, \`body\`) VALUES(?, ?, ?)`,
                [post.title, post.description, post.body]
            )
                .then(msg => { resolve(msg) })
                .catch(err => { reject(err) })
        })
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            this.query(this.getAllQueryBuilder())
                .then(msg => { resolve(msg) })
                .catch(err => { reject(err) })
        })
    }

    async updateOne(filter: Partial<Post>, post: Partial<Omit<Post, "id">>) {

        const { query, values } = this.updateQueryBuilder(filter, post);

        return new Promise((resolve, reject) => {
            this.query(query, values)
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }

    async getOne(post: Partial<Post>) {

        const { query, values } = this.getOneQueryBuiler(post);

        return new Promise((resolve, reject) => {
            this.query(query, [values[0]])
                .then(msg => { resolve(msg) })
                .catch(err => { reject(err) })
        })
    }

    async deleteOne(id: number) {
        throw new Error("Posts -> deleteOne() not implemented");
    }

}

export declare type PostsModels = Posts;
export const posts = new Posts();

