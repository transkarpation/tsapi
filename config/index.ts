import dotenv from 'dotenv'
dotenv.config()

import app from './app.config'
import swagger from './swagger.config'

export default {
  app,
  swagger
}