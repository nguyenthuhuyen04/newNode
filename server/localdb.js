require('dotenv').config({ quiet: true });
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'STUDENTSREG',
});

const establishConnection = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                return reject(err);
            }
            console.log('Connected to the database!');
            resolve(connection);
        });
    });
};

const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            console.log('The solution is: ', results);
            resolve(results);
        });
    });
};

const commitQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((beginError) => {
            if (beginError) {
                return reject(beginError);
            }

            connection.query(sql, params, (queryError, results) => {
                if (queryError) {
                    return connection.rollback(() => reject(queryError));
                }

                connection.commit((commitError) => {
                    if (commitError) {
                        return connection.rollback(() => reject(commitError));
                    }
                    resolve(results);
                });
            });
        });
    });
};

const endConnection = () => {
    return new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                console.error('Error ending the connection: ' + err.stack);
                return reject(err);
            }
            console.log('Connection ended successfully.');
            resolve();
        });
    });
};

module.exports = {
    connection,
    establishConnection,
    query,
    commitQuery,
    endConnection,
};
