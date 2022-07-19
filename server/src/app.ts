import express from 'express'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import helmet from "helmet";
import { apiLimiter } from './middlewares/middlewares'

dotenv.config()
const app = express()
const dirPath = path.resolve(__dirname, './routes')

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



//Error Middleware should always be last 
app.use(errorHandler)

//Database Connection
const mongoUrl = process.env.MONGO_URI
const databaseName = process.env.DB_NAME
mongoose.connect(<string>mongoUrl)
.then(()=> console.log('connected to database'))
.catch((error)=> console.log('database connection failed', error))

//server connection
const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`Server running on port ${port}`))
process.on("unhandledRejection", (err, promise)=> {
    console.log(`Logged Error: ${err}`, )
    server.close(() => process.exit(1))
})