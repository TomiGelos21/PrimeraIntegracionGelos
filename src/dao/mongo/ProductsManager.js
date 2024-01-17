import productsModel from '../models/products.model.js'

class ProductManager {
	#products

	getProducts = async () => {
		try {
			const products = await productsModel.find().lean().exec()

			this.#products = products

			return this.#products
		} catch (error) {
			throw new Error(error)
		}
	}

	addProduct = async (title, description, code, price, status, stock, category, thumbnails) => {
		try {
			if(!title || !description || !code || !price || !stock || !category){
				if(!title){
					throw new Error('Title is required')
				} else if(!description){
					throw new Error('Description is required')
				} else if(!code){
					throw new Error('Code is required')
				} else if(!price){
					throw new Error('Price is required')
				} else if (!stock){
					throw new Error('Stock is required')
				} else if (!category){
					throw new Error('Category is required')
				} else {
					throw new Error('Missed required arguments')
				}
			}

			const newProduct = {
				title: title.trim(),
				description: description.trim(),
				code: code.trim(),
				price: Number(price),
				status: Boolean(status),
				stock: Number(stock),
				category: category.trim(),
				thumbnails: thumbnails || []
			}

			await productsModel.create(newProduct)

			return this.getProducts()
		} catch (error) {
			throw new Error(`Error trying to add a product: ${error}`)
		}
	}


	getProductById = async (pid) => {
		try {
			if(!pid) throw new Error('Product ID is required')

			const product = await productsModel.findById(pid).lean().exec()
			
			return product
		} catch (error) {
			throw new Error(`Error trying to get a product by Id: ${error}`)
		}
	}
	

	updateProduct = async (pid, field, data) => {
		try {
			if(!pid || !field || !data){
				if(!pid){
					throw new Error('Product ID is required')
				} else if(!field){
					throw new Error('Field to update is required')
				} else if(!data){
					throw new Error('New data is required')
				} else {
					throw new Error('Missed required arguments')
				}
			}

			const updatedProduct = await productsModel.updateOne({ _id: pid }, { [field]: data })

			return updatedProduct
		} catch (error) {
			throw new Error(`Error trying to update product: ${error}`)
		}
	}

	deleteProduct = async (pid) => {
		try {
			if(!pid) throw new Error('Product ID required')

			await productsModel.deleteOne({ _id: pid })

			return this.getProducts()
		} catch (error) {
			throw new Error(`Error trying to delete product: ${error}`)
		}
	}
	
}

const productManager = new ProductManager()

export default productManager