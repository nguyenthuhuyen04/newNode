const express = require('express');
const app = express();
const port = 9000;
const {
    connection,
    establishConnection,
    query,
    commitQuery,
    endConnection,
} = require('./server/localdb');
const { sql, update } = require('./server/query');

app.get('/api/test', (req, res) => {
    res.json({
        message: 'Test API',
    });
});

app.get('/myget1', (req, res) => {
    res.json({
        message: 'Mygette1',
    });
});

app.get('/api/get', (req, res) => {
    res.json({
        message: 'This is a GET request!',
    });
});

app.get('/api/dbconn', async (req, res) => {
    try {
        await establishConnection();
        const results = await query(sql);
        res.json({ query: results });
    } catch (error) {
        console.error('Query error: ' + (error.stack || error));
        res.status(500).json({ error: 'Database query failed' });
    } finally {
        try {
            await endConnection();
        } catch (closeError) {
            console.error('Error closing the connection: ' + closeError.stack);
        }
    }
});

app.get('/api/dbupdate', async (req, res) => {
    try {
        await establishConnection();
        const results = await commitQuery(update);
        res.json({ updated: true, results });
    } catch (error) {
        console.error('Update error: ' + (error.stack || error));
        res.status(500).json({ error: 'Database update failed' });
    } finally {
        try {
            await endConnection();
        } catch (closeError) {
            console.error('Error closing the connection: ' + closeError.stack);
        }
    }
});

app.listen(port, () => {
    console.log('port is listening', port);
});