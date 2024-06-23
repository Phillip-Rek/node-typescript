import { Table } from "./index";

export declare type Quote = {
    id: number,
    name: string,
    message: string,
    date: Date
}

class Quotes extends Table {

    tableName: string = "quotes";

    structure = [
        '\`id\` int NOT NULL AUTO_INCREMENT',
        '\`name\` varchar(150) NOT NULL',
        '\`message\` varchar(2500) NOT NULL',
        '\`date\` Date DEFAULT current_timestamp()',
        'PRIMARY KEY (\`id\`)'
    ]

    constructor() {
        super();

    }

    async createOne(user: Omit<Quote, "id">) {
        return new Promise((resolve, reject) => {
            this.query(
                `INSERT INTO ${this.tableName}(\`name\`, \`message\`)
                VALUES(?, ?)`, [user.name, user.message]
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

    async update(quote: Omit<Quote, "date">) {
        return new Promise((resolve, reject) => {
            this.query(`UPDATE ${this.tableName} SET \`name\`=?, \`message\`=? WHERE \`id\`=?`, [quote.name, quote.message, quote.id])
                .then(res => { resolve(res) })
                .catch(err => { reject(err) })
        })
    }

}

export const quotes = new Quotes();

