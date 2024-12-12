import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const dbStatus = dbClient.isAlive();
    const redisStatus = redisClient.isAlive();

    if (dbStatus && redisStatus) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(500).json({ redis: false, db: false });
    }
  }

  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]).then((data) => {
      const [users, files] = data;
      res.status(200).json({ users, files });
    }).catch((error) => console.error(error));
  }
}

export default AppController;
