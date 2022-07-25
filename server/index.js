import express, { response } from 'express';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');


const { Pool } = require('pg') //postgreSQL Pool library
require('dotenv').config()
const pool = new Pool({
    user: 'wbejlafffgmfxp',
    host: 'ec2-3-228-235-79.compute-1.amazonaws.com',
    database: 'daega0ttst88l3',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const port = process.env.PORT || 3000;
const app = express();
const multer = require("multer");
const path = require("path");
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// const readableStreamForFile = fs.createReadStream('./upload/images/profile_1657996753204.jpeg');

const options = {
    pinataMetadata: {
        name: "Profile_Image",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

// var ipfs_hash = [];
// pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
//     //handle results here
//     ipfs_hash = result["IpfsHash"];
//     console.log(ipfs_hash);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });


// storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})

app.use('/profile', express.static('upload/images'));

app.post("/upload", upload.single('profile'), async (req, res) => {
    const { user_id } = req.params;
    // const upload_image = await pool.query(
    //     'INSERT INTO a_user_image (image_hash, user_id) VALUES ($1, $2) RETURNING *', 
    //     [ipfs_hash, user_id]
    // );
    res.json({
        success: 1,
        profile_url: `http://localhost:3000/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

app.use(errHandler);
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());

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
        const updateUser = await pool.query('UPDATE a_user SET first_name = $1, last_name = $2, description = $3 where user_id = $4', 
        [first_name, last_name, description, user_id]);
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