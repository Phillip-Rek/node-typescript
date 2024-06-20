import { DatabaseConnection } from ".";

export class Users {

    private static instance?: Users;
    private static tableName: string;

    private constructor() { }
    query = DatabaseConnection.query;

    static getInstance(tableName: string) {
        Users.tableName = tableName;
        if (this.instance) {
            return this.instance
        }
        else {
            DatabaseConnection.getConnection([Users.createTable]);
            Users.createTable();

            console.log("Created Users Instance");

            this.instance = new Users();
            return this.instance
        }
    }
}