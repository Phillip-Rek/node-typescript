import * as mysql from "mysql";
import { brand } from "../brand";

export class DatabaseConnection {

    private static conn?: mysql.Connection;

    static dbName = brand.brandName.replace(/[ ]+/g, "_");

    private constructor(callbacks: Array<() => {}>) {
        DatabaseConnection.init(callbacks);
    }



    static async init(callbacks: Array<() => {}>) {

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
                    callbacks.forEach(callback => {
                        callback();
                    });
                    console.log("Connected to database " + this.dbName);
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

    static getConnection(callbacks: Array<() => any>): mysql.Connection | undefined {
        if (this.conn) { return this.conn }
        else {

            DatabaseConnection.init(callbacks);


            if (this.conn) { return this.conn }

        }
    }
}

// REGISTERING DATABASE TABLES
DatabaseConnection.getConnection([
    // Posts.createTable,
    // Visits.createTable,
    // Quotes.createTable
]);
