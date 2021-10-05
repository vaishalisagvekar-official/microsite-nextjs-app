import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://plotnetworkuser:HaDXynz0VaH2qBoe@cluster0-shard-00-00.bdyvp.mongodb.net:27017,cluster0-shard-00-01.bdyvp.mongodb.net:27017,cluster0-shard-00-02.bdyvp.mongodb.net:27017/plotnetwork?ssl=true&replicaSet=atlas-g566bp-shard-0&authSource=admin&retryWrites=true&w=majority';
const dbName = 'plotnetwork';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(connectionString, opts);
    await client.connect();
    let db = client.db(dbName);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

  
