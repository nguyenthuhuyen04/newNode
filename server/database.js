app.get('/api/dbconnection', (req, res) => {
  const connection = mysql.createConnection({
    host: 'mysql-14737a33-nglthu-4e05.k.aivencloud.com',
    port: 17237,
    user: 'avnadmin',
    password: 'AVNS_....',
    database: 'STUDENTSREG',
    ssl: {
      ca: fs.readFileSync('./server/ca.pem'), // Path to the CA certificate downloaded from Aiven
      rejectUnauthorized: true
    }
  });

  connection.connect((err) => {
    if (err) {
      console.error('Connection failed: ' + err.stack);
      res.status(500).json({ error: 'Database connection failed' });
      return;
    }
    console.log('Connected to Aiven MySQL... Connection ID: ' + connection.threadId);
  });

  connection.query('SELECT * FROM STUDENT_ENROLEMENT LIMIT 3;', (error, results) => {
    if (error) {
      console.error('Query error: ' + error.stack);
      res.status(500).json({ error: 'Database query failed' });
      connection.end();
      return;
    }

    res.json({ query: results });
    connection.end();
  });
});