import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { sequelize } from './db'
import errorHandler from './middleware/ErrorHandlingMiddleware'
import router from './routes/index'

dotenv.config({ path: path.resolve(__dirname, '.env') })

const PORT = process.env.PORT || 5000

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.resolve(__dirname, 'static')))
server.use(fileUpload({}))
server.use('/api', router)
server.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    server.listen(PORT, () => console.log(`SERVER IS UP on ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
