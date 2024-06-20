import { DatabaseConnection } from ".";

export class Users {

    private static instance?: Users;
    private static tableName: string;

    private constructor() { }
    query = DatabaseConnection.query;


}