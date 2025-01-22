const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://b122310195:<db_password>@cluster0.v7wqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json())

app.get('/', (req, res) => {
   res.send('Hello World!')
})
//params
app.get('/:username/:password', (req, res) => {
   console.log(req.params)
   res.send('Hello ' + req.params.username + req.params.password)
})

//body
app.get('/login', (req, res) => {
   console.log(req.body)
   res.send('Login successfully ' + req.body.username + req.body.password)
})

//body
app.post('/register', (req, res) => {
   console.log(req.body.password)
   const hash = bcrypt.hashSync(req.body.password, saltRounds);
   console.log(hash)

   client.db("BERR2243").collection("users").insertOne({
      "name": req.body.name,
      "username": req.body.username,
      "password": hash

   })
   res.send('Register successfully')
})

app.listen(port, () => {
   console.log(Example app listening on port ${port})
})

async function run() {
   try {
     // Connect the client to the server  (optional starting in v4.7)
     await client.connect();
     // Send a ping to confirm a successful connection
     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
     // Ensures that the client will close when you finish/error
   //  await client.close();
   }
 }
 run().catch(console.dir);
