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

// const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json({limit: "30mb", extend: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extend: true}))
app.use(cors());
// app.use(fileUpload());

//ROUTES//

app.get('/', (request, response) => {
    response.json({ info: 'Backend Web3 Development Database'})
  });

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
app.get('/user/id', async (request, response) =>{
    try {
        // const { user_id } = request.params;
        const { user_id } = request.body;
        const user = await pool.query(
            'SELECT * FROM a_user WHERE user_id = $1', 
            [user_id]
        );
        response.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//create a user
app.post('/user', async (request, response) =>{
    try {
        const { user_id, first_name, last_name, description} = request.body;
        const newUser = await pool.query(
            'INSERT INTO a_user (user_id, first_name, last_name, description) VALUES ($1, $2 , $3, $4) RETURNING *',
             [user_id, first_name, last_name, description]           
             );
        response.json("Successfully inserted new user!");
    } catch (err) {
        response.json("User has already existed!");
    }
})

// //upload an image
// app.post('/post', async (request, response) =>{
//     const {name, data} = request.files.pic;
//     if (name && data) {
//         await pool.query(
//             'INSERT INTO a_user_image (image_id, img, name) VALUES ($1, $2 , $3) RETURNING *',
//             [image_id, data, name]
//         );
//         res.sendStatus(200);
//     } else {
//         res.sendStatus(400);
//     }
// })

// //get an image
// app.get('/img/:image_id', async (request, response) =>{
//     try {
//         const { image_id } = request.params;
//         const user = await pool.query(
//             'SELECT * FROM a_user_image WHERE image_id = $1', 
//             [image_id]
//         );
//         response.json(user.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// })


//update all the user's information, including first_name, last_name, and description.
app.put('/user/id', async (request, response) =>{
    try {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();// at this point, `body` has the entire request body stored in it as a string
        });

        //update user's first_name
        const { user_id } = request.body;
        const { first_name } = request.body;
        const updateFirstName = await pool.query(
            'UPDATE a_user SET first_name = $1 WHERE user_id = $2', 
            [first_name, user_id]
        );

        //update user's last_name
        const { last_name } = request.body;
        const updateLastName = await pool.query(
            'UPDATE a_user SET last_name = $1 WHERE user_id = $2', 
            [last_name, user_id]
        );
        //update user's description
        const {description} = request.body;
        const updateDescription = await pool.query(
            'UPDATE a_user SET description = $1 WHERE user_id = $2', 
            [description, user_id]
        );     
        response.json("Successfully updated all the information!");       
        
        
    } catch (err) {
        console.error(err.message);
    }
})

//delete an user
app.delete('/users/id', async (request, response) =>{
    try {
        const { user_id } = request.body;
        const deleteUser = await pool.query(
            'DELETE FROM a_user WHERE user_id = $1', 
            [user_id]
        );
        response.json("User was deleted!");
    } catch (err) {
        response.json("User not exists!");
    }
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})