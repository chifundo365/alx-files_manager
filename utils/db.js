import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const db = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${db}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.client.connect().then(() => {
      this.db = this.client.db(db);
    }).catch((error) => console.error(error));
  }

  isAlive() {
    return this.client.isConnected();
  }

  /**
   * counts the number of documents in the users Collection
   */
  async nbUsers() {
    try {
      const n = await this.client.db().collection('users').countDocuments();
      return n;
    } catch (err) {
      console.error('Error fetching user count', err);
      return 0;
    }
  }

  /**
   * Counts the number of documents in the files collection
   */
  async nbFiles() {
    try {
      const n = await this.client.db().collection('files').countDocuments();
      return n;
    } catch (error) {
      console.error('Error fetching file count');
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
