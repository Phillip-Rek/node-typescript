import { DatabaseConnection } from ".";

export class Users {

    private static instance?: Users;
    private static tableName: string;

    private constructor() { }

    static query = DatabaseConnection.query;

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

    static createTable = () => {
        Users.query(`SELECT * FROM ${Users.tableName}`)
            .then(res => {
                console.log(`TABLE, ${Users.tableName} EXIST`);
            })
            .catch(err => {
                console.log(`CREATED TABLE, ${Users.tableName}`);
                Users.query(`CREATE TABLE \`${Users.tableName}\`(
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(150) NOT NULL,
                \`password\` varchar() NOT NULL,
                \`email\` varchar(150) NOT NULL,
                \`date\` Date DEFAULT current_timestamp(),
                PRIMARY KEY (\`id\`)
                ) ENGINE=InnoDB COLLATE=utf8_general_ci;`);
            })
    }

}