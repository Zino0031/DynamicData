import { getConnection, closeConnection } from '@/pages/api/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { hostname, username, password, database, query } = req.body;

    try {
      const connection = getConnection(hostname, username, password, database);

      connection.connect((connectErr) => {
        if (connectErr) {
          console.error('Error connecting to the MySQL server:', connectErr);
          res.status(500).json({ message: 'Error connecting to the MySQL server' });
          return;
        }

        connection.changeUser({ database: database }, (useDbErr) => {
          if (useDbErr) {
            console.error('Error changing to the database:', useDbErr);
            res.status(500).json({ message: 'Error changing to the database' });
            closeConnection(connection);
            return;
          }

          const createSalesTableQuery = `
            CREATE TABLE IF NOT EXISTS Sales (
              SaleId INT AUTO_INCREMENT PRIMARY KEY,
              SaleData DATE,
              Quantity INT
             
            )
          `;
          
          connection.query(createSalesTableQuery, (createTableErr) => {
            if (createTableErr) {
              console.error('Error creating the Sales table:', createTableErr);
              res.status(500).json({ message: 'Error creating the Sales table' });
              closeConnection(connection);
              return;
            }

            connection.query(query, (queryErr, results) => {
              if (queryErr) {
                console.error('Error executing the query:', queryErr);
                res.status(500).json({ message: 'Error executing the query' });
                closeConnection(connection);
                return;
              }

              res.status(200).json(results); 
              closeConnection(connection);
            });
          });
        });
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Error connecting to the database' });
    }
  } else {
    res.status(405).end();
  }
}
