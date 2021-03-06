const express = require('express')
const app = express();
const { MongoClient, ServerApiVersion, ExplainVerbosity, ObjectId  } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2grod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
     await client.connect();
    const serviceCollection= client.db('toolsService').collection('carInfo')
    const wpbser= client.db('toolsService').collection('wpb')
    const emailAccount= client.db('toolsService').collection('emails')
    const orderses= client.db('toolsService').collection('addCars')
    const FacebookAccount= client.db('toolsService').collection('account')
    

    app.get('/cars',async(req,res)=>{
        const cars = await serviceCollection.find().toArray();
        res.send(cars)
    });

     app.get('/cars/:id', async(req,res)=>{
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const data = await serviceCollection.findOne(query)
    res.send(data)
     })

   
    app.get('/wpb',async(req,res)=>{
        const wpbs = await wpbser.find().toArray();
        res.send(wpbs)
    });
   
    app.post('/email',async(req,re,s)=>{
        const email = req.body;
        console.log(req.body)
        const results = await emailAccount.insertOne(email);
        res.send(results)
    })
    app.get('/email',async(req,res)=>{
        const emails = await emailAccount.find().toArray();
        res.send(emails)
    });

    app.put('/addCars',async(req,res)=>{
           const data = req.body;
           const results = await serviceCollection.insertOne(data);
           res.send(results)
    })

    app.get('/order',async(req,res)=>{
        const results = await orderses.find().toArray();
        res.send(results)
    })
    app.put('/order',async(req,res)=>{
        const data = req.body;
        const results = await orderses.insertOne(data);
        res.send(results)
 })
   app.get('/order/:id',async(req,res)=>{
    const  id = req.params.id;
    const query = {_id:ObjectId(id)};
    const result = await orderses.findOne(query);
    res.send(result)
   })
   app.delete('/order/:id',async(req,res)=>{
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result= await orderses.deleteOne(query);
    res.send(result)
   })
 
 app.get('/addCars',async(req,res)=>{
    const results = await addCarses.find().toArray();
    res.send(results)
})
  app.post('/account', async (req, res) => {
    const users = req.body;
    
    const results = await FacebookAccount.insertOne(users);
     res.send(results)
  })

  app.get('/account',async(req,res)=>{
    const orderses= await FacebookAccount.find().toArray();
    res.send(orderses)
  })
  app.delete('/account/:id', async (req, res) => {
    const id = req.body.id;
   
    const query = { _id: ObjectId(id) };
    const result = await FacebookAccount.deleteOne(query);
    console.log(result);
    res.send(result);
    // res.send(id)
});
  
    }
    finally{

    }

}

run().catch(console.dir)
app.get('/',(req,res)=>{
    res.send('This is form Abdur rahiim')
})

app.listen(port,()=>{
    console.log('assginment-12port is  ',port);
})
