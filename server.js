import express from 'express'
import mongoose from 'mongoose'
import Videos from './dbModel.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 9000


app.use(express.json())
app.use(cors())

const connection_url = "mongodb+srv://kamalyogi0134:p57j58lw1K134yQT@cluster0.m5ptopg.mongodb.net/?retryWrites=true&w=majority"
const dbName = "tiktok"
mongoose
  .connect(`${connection_url}`, {
    dbName:dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Additional code or actions after successfully connecting to the database
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.get("/",(req,res)=>{
    res.status(200).send({messahe:true})
})

app.get('/v2/posts',async(req,res)=>{
    try {
        const dbVideos = req.body
        const createdVideos = await Videos.find();
        res.status(200).send(createdVideos)
        console.log('Videos created successfully:', createdVideos);
        // Additional code or actions after creating the videos
        } catch (error) {
        res.status(500).send(error)
        console.error('Error creating videos:', error);
        }
})

app.post('/v2/posts',async(req,res)=>{
    try {
        const dbVideos = req.body
        const createdVideos = await Videos.create(dbVideos);
        res.status(201).send(createdVideos)
        console.log('Videos created successfully:', createdVideos);
        // Additional code or actions after creating the videos
        } catch (error) {
        res.status(500).send(error)
        console.error('Error creating videos:', error);
        }
})




app.listen(port,()=>{
    console.log('Server is up and running on port '+port)
})