import { Apis } from './asunc.js'
import { data_color } from './main.js'

let AddForm = document.querySelector('#Add_product_from')
AddForm.onsubmit = async e => {
	e.preventDefault()
	let obj = {
		name: AddForm['Name'].value,
		img: AddForm['img'].value,
		info: AddForm['desc'].value,
		count: AddForm['count'].value,
		company: AddForm['company'].value,
		color: data_color,
	}
	if (
		obj.name &&
		obj.img &&
		obj.info &&
		obj.count &&
		obj.company &&
		obj.color
	) {
		await new Apis().Post(obj)
	}
}

AddForm['img'].oninput = () => {
	document.querySelector('#IMG').src = AddForm['img'].value
}
document.querySelector('#IMG').onerror = () => {
	document.querySelector('#IMG').src = ''
}
