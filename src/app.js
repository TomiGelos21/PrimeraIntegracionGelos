import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.routes.js'
import viewsProductsRouter from './routes/views.products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import chatRouter from './routes/chat.routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// dotenv config
dotenv.config()

// Express config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

// Handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

// ENV
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017'

const run = async () => {
	try{
		await mongoose.connect(mongoUri)

		const httpServer = app.listen(8080, () => console.log('Server up'))
		const io = new Server(httpServer)

		app.use('/api/products', productsRouter)
		app.use('/api/carts', cartsRouter)
		app.use('/chat', chatRouter(io))
		app.use('/', viewsProductsRouter(io))
	} catch (error) {
		console.error(error)
	}
}

await run()