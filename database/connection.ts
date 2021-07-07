import { Db, MongoClient } from 'mongodb'

const uri = process.env['MONGODB_URI'];

if (uri === undefined) {
    throw new Error("Missing 'MONGODB_URI' environment variable!");
}

const database = process.env['MONGODB_DATABASE'];

if (database === undefined) {
    throw new Error("Missing 'MONGODB_DATABASE' environment variable!");
}

const client = new MongoClient(uri, { useUnifiedTopology: true });

abstract class Mongo {

    private constructor() { }

    public static async connect(): Promise<void> {
        if (!client.isConnected()) {
            await client.connect();
        }
    }

    public static get db(): Db {
        return client.db(database);
    }

};

export default Mongo;