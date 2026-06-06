require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log('Conexão com o banco bem sucedida! ✅'))
    .catch((err) => {
        console.error('Falha na conexão com o banco de dados! ❌');
        console.error(err);
    });

const cors = require('cors');
const express = require('express')
const app = express();

app.use(cors());
app.use(express.json());

app.patch('/insert', async (req, res) => {
    const result = await pool.query(
        'UPDATE Apoiadores SET apoio = apoio + 1 RETURNING apoio'
    );

    res.json(result.rows[0]);
});

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));