import { ShowProduct } from './main_2.js'
import { ShowProd } from './naim_1.js'
let data_ = null
export class Apis {
	#api = 'http://localhost:3000/data'
	#api_2 = 'http://localhost:3000/Users'
	constructor() {
		this.Get()
	}
	async Get() {
		try {
			const { data: datas } = await axios.get(this.#api)
			if (document.title == 'Products') {
				new ShowProd().Draw_Products(datas)
			}
			if (document.title == 'Home') {
				new ShowProduct().Draw_Products(datas)
			}
			data_ = datas
		} catch (error) {
			console.error(error)
		}
	}
	async Post(obj) {
		try {
			await axios.post(this.#api, obj)
			this.Get()
		} catch (error) {}
	}
	async Put(id, obj) {
		try {
			await axios.put(`${this.#api}/${id}`, obj)
			this.Get_prod()
		} catch (error) {}
	}
	async Delete(id) {
		try {
			await axios.delete(`${this.#api}/${id}`)
			this.Get_prod
		} catch (error) {}
	}
	async Get_User() {
		try {
			const { data: data_2 } = await axios.get(this.#api_2)
			return data_2
		} catch (error) {}
	}
	async Post_User(obj) {
		try {
			await axios.post(this.#api_2, obj)
			this.Get_User()
		} catch (error) {}
	}
	async Put_User(id, obj) {
		try {
			await axios.put(`${this.#api_2}/${id}`, obj)
			this.Get_User()
		} catch (error) {}
	}
	async Del_User(id) {
		try {
			await axios.delete(`${this.#api_2}/${id}`)
			this.Get_User()
		} catch (error) {}
	}
	async Get_prod() {
		try {
			const { data: data_3 } = await axios.get(this.#api)
			return data_3
		} catch (error) {}
	}
}
export { data_ }
new Apis()
