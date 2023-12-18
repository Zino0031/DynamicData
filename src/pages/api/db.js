import mysql from 'mysql';

export function getConnection(hostname, username, password, database) {
    const dbConfig = {
      host: hostname,
      user: username,
      password: password,
      database: database,
      port: 3306 
    };
  
    return mysql.createConnection(dbConfig);
    
  }
  
  export function closeConnection(connection) {
    connection.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err);
      } else {
        console.log('Database connection closed.');
      }
    });
  }

  export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { hostname, username, password, database } = req.body;
  
      try {
        const connection = getConnection(hostname, username, password, database);
  
        connection.connect((err) => {
          if (err) {
            res.status(500).json({ message: 'Error connecting to the database' });
            return;
          }
  
          res.status(200).json({ message: 'Successfully connected to the database' });

        });
      } catch (err) {
        res.status(500).json({ message: 'Error connecting to the database' });
      }
    } else {
      res.status(405).end(); 
    }
  }