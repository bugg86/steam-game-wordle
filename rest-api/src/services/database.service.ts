import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const steamDataCollection: mongoDB.Collection = db.collection(process.env.STEAMDATA_COLLECTION_NAME);
 
    collections.games = steamDataCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${steamDataCollection.collectionName}`);
 }