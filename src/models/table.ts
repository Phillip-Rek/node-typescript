import { DatabaseConnection } from "./index";

export class Table {
    tableName: string = "";
    structure: string[] = [];
    constructor() {
        DatabaseConnection.getConnection([this]);
    }

    async createTable(tableStructure: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.query(`SELECT * FROM ${this.tableName}`)
                .then(res => {
                    console.log(`TABLE, ${this.tableName} EXIST`);

                    resolve(`TABLE, ${this.tableName} EXIST`);
                })
                .catch(err => {
                    console.log(`CREATED TABLE, ${this.tableName}`);
                    this.query(`CREATE TABLE \`${this.tableName}\`(${tableStructure.replace(/[ \s\n]+/g, " ")}
                    ) ENGINE=InnoDB COLLATE=utf8_general_ci;`);

                    resolve(`CREATED TABLE, ${this.tableName}`);
                })
        })
    }

    query = DatabaseConnection.query;

}