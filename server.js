const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./Controllers/register');
const signin = require('./Controllers/Signin')
const profile = require('./Controllers/rank')
const image = require('./Controllers/image')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
  client: 'pg',
  connection: {
  	//local host number: host : 127.0.0.1
    connectionString: process.env.DATABASE_URL, 
    ssl: true,
    // user : 'postgres',
    // password : 'Chemiztry95',
    // database : 'smartbrain'
  }
});

const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('working!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) =>  { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



app.listen(process.env.PORT || 3000, () => {
	console.log(`app running on port ${process.env.PORT}`);
})


