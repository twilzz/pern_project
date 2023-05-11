import * as dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './db'

dotenv.config()
const PORT = process.env.PORT || 5000

const server = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})
        server.listen(PORT, () => console.log(`SERVER IS UP on ${PORT}` )
)
    } catch (error) {
        console.log(error);
        
    }
}

start()
