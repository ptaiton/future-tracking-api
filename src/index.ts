require('dotenv').config()
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import { configureRouter } from './router/router'
import { config } from './services/configService'
import './services/dbService'


const startServer = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(cors())
  app.use(json())
  
  
  configureRouter(app)

  app.listen(config.LISTEN_PORT, () => {
    console.log(`Listening on port ${config.LISTEN_PORT}`)
  })
}

export default startServer()