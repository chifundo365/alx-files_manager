import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const db = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${db}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect().catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      process.exit();
    });
  }

  isAlive() {
    return this.client.topology.isConnected();
  }

  /**
   * counts the number of documents in the users Collection
   */
  async nbUsers() {
    try {
      return await this.client.db().collection('users').countDocuments();
    } catch (err) {
      console.error('Error fetching user count', err);
      throw err;
    }
  }

  /**
   * Counts the number of documents in the files collection
   */
  async nbFiles() {
    try {
      return await this.client.db().collection('files').countDocuments();
    } catch (error) {
      console.error('Error fetching file count');
      throw error;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
