import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createRequire } from 'module';
import { request } from 'http';
const require = createRequire(import.meta.url);

const { Pool } = require('pg') //postgreSQL Pool library
require('dotenv').config()
const devConfig = {
    user: 'wbejlafffgmfxp',
    host: 'ec2-3-228-235-79.compute-1.amazonaws.com',
    database: 'daega0ttst88l3',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

const proConfig = {
    connectionString: process.env.DATABASE_URL //heroku addons
};
const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
);

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({limit: "30mb", extend: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extend: true}))
app.use(cors());

//ROUTES//

app.get('/', (request, response) => {
    response.json({ info: 'Backend Web3 Development Database'})
  });

//create a user
app.post('/users', async (request, response) =>{
    try {
        const { user_id, first_name, last_name, description} = request.body;
        const newUser = await pool.query(
            'INSERT INTO a_user (user_id, first_name, last_name, description) VALUES ($1, $2 , $3, $4) RETURNING *',
             [user_id, first_name, last_name, description]           
             );
        response.json(newUser.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get all users
app.get('/users', async (request, response) =>{
    try {
        const getUsers = await pool.query('SELECT * FROM a_user');
        response.json(getUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get an user
app.get('/users/:user_id', async (request, response) =>{
    try {
        const { user_id } = request.params;
        const user = await pool.query(
            'SELECT * FROM a_user WHERE user_id = $1', 
            [user_id]
        );
        response.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update an user's first name
app.put('/users/:user_id', async (request, response) =>{
    try {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        });
        //update first_name
        const { user_id } = request.params;
        const { first_name } = request.body;
        const updateFirstName = await pool.query(
            'UPDATE a_user SET first_name = $1 WHERE user_id = $2', 
            [first_name, user_id]
        );
        response.json("User's first name was updated!");

        //update last_name
        const { last_name } = request.body;
        const updateLastName = await pool.query(
            'UPDATE a_user SET last_name = $1 WHERE user_id = $2', 
            [last_name, user_id]
        );
        response.json("User's last name was updated!");

            // case 3: const {description} = request.body;
            //         const updateDescription = await pool.query(
            //             'UPDATE a_user SET description = $1 WHERE user_id = $2', 
            //             [description, user_id]
            //         );
            //         response.json("User description was updated!");  
            //         break;              
        
        
    } catch (err) {
        console.error(err.message);
    }
})

// //update an user's last name
// app.put('/users/:user_id', async (request, response) =>{
//     try {
//         const { user_id } = request.params;
//         const {last_name} = request.body;
        // const updateUser = await pool.query(
        //     'UPDATE a_user SET last_name = $1 WHERE user_id = $2', 
        //     [last_name, user_id]
        // );
//         response.json("User's last name was updated!");
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //update an user's description
// app.put('/users/:user_id', async (request, response) =>{
//     try {
//         const { user_id } = request.params;
//         const {description} = request.body;
//         const updateUser = await pool.query(
//             'UPDATE a_user SET description = $1 WHERE user_id = $2', 
//             [description, user_id]
//         );
//         response.json("User description was updated!");
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //delete an user
// app.delete('/users/:user_id', async (request, response) =>{
//     try {
//         const { user_id } = request.params;
//         const deleteUser = await pool.query(
//             'DELETE FROM a_user WHERE user_id = $1', 
//             [user_id]
//         );
//         response.json("User was deleted!");
//     } catch (err) {
//         console.log(err.message);
//     }
// })

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