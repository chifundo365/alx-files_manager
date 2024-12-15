import dbClient from '../utils/db';

class UsersController {
  static postNew(req, res) {
    const credentials = req.body;

    if (!('email' in credentials)) {
      res.status(400).json({ error: 'Missing email' });
    } else if (!('password' in credentials)) {
      res.status(400).json({ error: 'Missing password' });
    } else {
      dbClient.exists({ email: credentials.email }).then((exists) => {
        if (exists) {
          res.status(400).json({ error: 'Already exist' });
        } else {
          dbClient.createUser(credentials).then((id) => {
            res.status(201).json({ email: credentials.email, id });
          }).catch((error) => console.error(error));
        }
      }).catch((error) => console.error(error));
    }
  }
}

export default UsersController;
