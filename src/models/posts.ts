import { Table } from "./index";

export declare type Post = {
    id: number,
    title: string,
    description: string,
    body: string,
    date: Date
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

    constructor() {
        super();
    }

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
            this.query(`SELECT * FROM ${this.tableName}`)
                .then(msg => { resolve(msg) })
                .catch(err => { reject(err) })
        })
    }

    async update(post: Omit<Post, "date">) {
        return new Promise((resolve, reject) => {
            this.query(`UPDATE ${this.tableName} SET \`title\`=?, \`description\`=?, \`body\`=? WHERE \`id\`='${post.id}'`,
                [post.title, post.description, post.body]
            )
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }

    async getOne(id: number) {
        return new Promise((resolve, reject) => {
            this.query(`SELECT * FROM ${this.tableName} WHERE \`id\`=?`, [id])
                .then(msg => { resolve(msg) })
                .catch(err => { reject(err) })
        })
    }

    async deleteOne(id: number) {
        throw new Error("Posts -> deleteOne() not implemented");
    }

}

export const posts = new Posts();

