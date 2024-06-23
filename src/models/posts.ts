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


}

export const posts = new Posts();

