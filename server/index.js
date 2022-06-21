import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { Pool } = require('pg') //postgreSQL Pool library
const pool = new Pool({
    user: 'wbejlafffgmfxp',
    host: 'ec2-3-228-235-79.compute-1.amazonaws.com',
    database: 'daega0ttst88l3',
    password: '7adf5b3e6f5a01622043311f2cdd5caab39758dd0489aff2ecfab5bca8c824ce',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json({limit: "30mb", extend: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extend: true}))
app.use(cors());

app.get('/', (request, response) => {
    response.json({ info: 'Backend Web3 Development Database'})
  });

const getWallet = (request, response) => {
    pool.query('SELECT * FROM a_wallet', (error, results) => {
        if(error){
            throw error
        }
        return response.status(200).json(results.rows)
    })
}  

app.get('/balance/:wallet_id', getWallet)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})