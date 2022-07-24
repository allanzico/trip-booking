// @ts-nocheck

import express from 'express'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import helmet from "helmet";
import Experience from './models/Experience'
var cron = require('node-cron');
const today = new Date();
dotenv.config()
const app = express()
const dirPath = path.resolve(__dirname, './routes')

//append  client to server - required bt Github actions
app.use(express.static(path.join(__dirname, '/client/build')))

const errorHandler = require('./middlewares/error')

//middlewares
app.use(cors({}))
app.use(morgan('dev'))
app.use(express.json())
app.use(helmet({
    crossOriginResourcePolicy: false,
  }));

//route middleware
fs.readdirSync(dirPath).map((r) => 
app.use('/api', require(`${dirPath}/${r}`) )
)

//Date cronjob
cron.schedule('0 0 0 * * *', async () => {
  try {
    const experiences = await Experience.find({})
    experiences.map(exp =>{
      if(today > new Date(exp.endDate)){
        exp.isActive = false
        exp.save()
      }
  
    })
  } catch (error) {
    console.log(error);
  }
 
});


//Error Middleware should always be last 
app.use(errorHandler)

//Database Connection
const mongoUrl  =  <string> process.env?.['MONGO_URI']
mongoose.connect(<string>mongoUrl)
.then(()=> console.log('connected to database'))
.catch((error)=> console.log('database connection failed', error))

//server connection
const port  = <string> process.env?.['PORT'] || 5000
const server = app.listen(port, () => console.log(`Server running on port ${port}`))
process.on("unhandledRejection", (err)=> {
    console.log(`Logged Error: ${err}`, )
    server.close(() => process.exit(1))
})