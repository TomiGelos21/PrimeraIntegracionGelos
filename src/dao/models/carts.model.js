import mongoose from 'mongoose'

const cartsCollection = 'carts'

const productSchema = mongoose.Schema({
	productId: {
		type: String,
		unique: true
	},
	price: Number,
	quantity: Number
})

const cartsSchema = new mongoose.Schema({
	products: [productSchema]
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel