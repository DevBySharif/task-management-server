const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
const app=express()
const port=process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ide5est.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    
    const taskCollection=client.db('task-managementDB').collection('task')

    app.post('/task',async(req,res)=>{
      const taskData=req.body
      const result=await taskCollection.insertOne(taskData)
      res.send(result)
    })
    app.get('/task',async(req,res)=>{
        const result = await taskCollection.find().toArray()
        res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('task-management is running ')
})

app.listen(port,()=>{
    console.log(`task-management server running on port ${port}`);
})