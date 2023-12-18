import mysql from 'mysql';

export default async function handler(req, res) {
  const { hostname, username, password, database } = req.body;

  const dbConfig = {
    host: hostname,
    user: username,
    password: password,
    database: database,
    port: 3306
  };

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      res.status(500).json({ message: 'Error connecting to the database' });
      return;
    }

    res.status(200).json({ message: 'Successfully connected to the database' });

 
  });
}
