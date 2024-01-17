import cartsModel from '../models/carts.model.js'
import productManager from '../mongo/ProductsManager.js'

class CartManager {
	#carts
	constructor(){
		this.#carts = this.getCarts()
	}
	getCarts = async () => {
		try {
			const data = await cartsModel.find().lean().exec()

			this.#carts = data

			return this.#carts
		} catch (error) {
			throw new Error(error)
		}
	}

	getCartById = async (cid) => {
		try{
			if(!cid) throw new Error('Cart ID is required')

			const currentCart = await cartsModel.findById(cid).lean().exec()

			return currentCart
		} catch(error) {
			throw new Error(`Error trying to get product by Id ${error}`)
		}
	}

	addProductToCart = async (cid, pid) => {
		try{
			if(!cid || !pid) throw new Error('Missed required arguments')

			const product = await productManager.getProductById(pid)

			const newProduct = {
				product: pid,
				price: product.price,
				quantity: 1
			}
			
			const addToCart = cartsModel.updateOne({_id: cid}, {products: newProduct})

			return addToCart
		}catch(error){
			throw new Error(`Error trying to add a new product to cart: ${error}`)
		}
	}

}

const cartManager = new CartManager()

export default cartManager
