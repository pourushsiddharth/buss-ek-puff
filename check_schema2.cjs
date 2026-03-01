require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

async function run() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    await client.connect();
    try {
        const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'products'");
        fs.writeFileSync('cols.json', JSON.stringify(res.rows.map(r => r.column_name), null, 2));
        console.log("Wrote columns to cols.json");
    } catch (e) {
        console.error(e);
    } finally {
        await client.end();
    }
}
run();
