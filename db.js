import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres', // replace with your username
    host: 'localhost',
    database: 'project', // your DB name
    password: 'root123', // your DB password
    port: 5432
});

export default pool;
