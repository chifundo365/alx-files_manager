import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const dbStatus = dbClient.isAlive();
    const redisStatus = redisClient.isAlive();

    if (dbStatus && redisStatus) {
      res.status(200).json({ redis: true, db: true });
    }
    res.status(500).json({ redis: false, db: false });
  }

  static async getStats(req, res) {
    const users = await redisClient.nbUsers();
    const files = await redisClient.nbFiles();
    console.log(users);
    res.status(200).json(users, files);
  }
}

export default AppController;
