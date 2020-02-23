require('dotenv').config()
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import { configureRouter } from './router/router'
import './services/dbService'


const startServer = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors())
  app.use(json())
  
  
  configureRouter(app)

  app.listen(5000, () => {
    console.log('Listening on port 5000')
  })
}

export default startServer()