import { MongoClient, ServerApiVersion } from "mongodb";
import { fileURLToPath } from 'url';
import path from 'path'; // Import path module to handle file paths

import { dirname } from 'path';
import dotenv from 'dotenv-esm';

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the path to the config.env file in the parent directory
const envFilePath = path.resolve(__dirname, '..', 'config.env');

// Load the environment variables from the config.env file
dotenv.config({ path: envFilePath });

// Now you can access the ATLAS_URI environment variable
const uri = process.env.ATLAS_URI || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("employees");

export default db;
