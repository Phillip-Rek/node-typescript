import * as mysql from "mysql";
import { brand } from "../brand";
export class DatabaseConnection {

    // static ready = false;

    private static callbacks: Table[] = [];
    private static conn?: mysql.Connection;

    static dbName = brand.brandName.replace(/[ ]+/g, "_");

    private constructor(callbacks: Array<Table>) {
        DatabaseConnection.callbacks = callbacks;
        DatabaseConnection.init();
    }



    static async init() {

        // DatabaseConnection.ready = false;

        DatabaseConnection.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
        });

        this.connect(DatabaseConnection.conn)
            .then(res => { })
            .catch(err => { console.log(err) })

        DatabaseConnection.conn.query("CREATE DATABASE " + this.dbName, (err) => {

            if (err) console.log("Could not create database " + this.dbName);
            else console.log("DATABASE CREATED " + this.dbName);

            (<mysql.Connection>DatabaseConnection.conn).destroy();
            DatabaseConnection.conn = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: this.dbName
            });

            DatabaseConnection.conn.connect((err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    DatabaseConnection.callbacks.forEach(callback => {
                        callback.createTable(callback.structure.join(","));
                        console.log("Connected to database " + this.dbName);
                    });

                    // DatabaseConnection.ready = true;
                }
            });
        });
    }

    private static connect(connection: mysql.Connection) {
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) reject(err)
                else resolve("Database Conected");
            });
        })
    }

    static async getConnection(callbacks: Array<Table>) {
        DatabaseConnection.callbacks.push(...callbacks);
        if (DatabaseConnection.conn) {
            return this.conn
        }
        else {

            DatabaseConnection.init();


            if (this.conn) { return this.conn }

        }
    }

    static query = (query: string, args: any[] = []) => new Promise((resolve, reject) => {
        try {
            if (DatabaseConnection.conn) {

                DatabaseConnection.conn.query(query, args, (err, data) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(data)
                    }
                })
            }
            else {
                reject("There is no database connection")
            }
        }
        catch (err: unknown) {
            reject(err)
        }
    })
}


export class Table {
    protected tableName: string = "";
    structure: string[] = [];
    constructor() {
        DatabaseConnection.getConnection([this]);
    }

    protected createOneQueryBuilder(object: Object) {

    }

    protected getAllQueryBuilder() {
        return `SELECT * FROM ${this.tableName}`;
    }

    protected getOneQueryBuiler(object: Object) {
        const keys: string[] = [];
        const values: any[] = [];

        for (const [key, val] of Object.entries(object)) {
            if (val) {
                keys.push(key)
                values.push(val);
            }
        }

        const query = `SELECT * FROM ${this.tableName} WHERE \`${keys[0]}\`=?`



        return { query, values }
    }

    protected updateQueryBuilder(filter: Object, object: Object) {
        let queryString = `UPDATE ${this.tableName} SET `

        queryString += `\`${Object.entries(object)[0][0]}\`=?`;
        const values: any = [Object.entries(object)[0][1]];

        if (!Object.entries(object)[0]) return { query: "", values: [] }

        for (let i = 1; i < Object.entries(object).length; i++) {
            const [key, val] = Object.entries(object)[i]
            if (!val) continue

            queryString += ", "
            queryString += `\`${key}\`=?`;

            values.push(val);

        }

        const filterKeys = [Object.entries(filter)[0][0]];
        const filterValues = [Object.entries(filter)[0][1]];

        for (let i = 1; i < Object.entries(filter).length; i++) {
            const [key, val] = Object.entries(filter)[i];
            if (!val) continue

            queryString += ", "
            filterKeys.push(key[0])
            filterValues.push(val[1])
        }

        queryString += ` WHERE \`${filterKeys[0]}\`='${filterValues[0]}'`;

        console.log(queryString, values)
        return { query: queryString, values };
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

    protected query = DatabaseConnection.query;

}

