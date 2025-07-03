import { Apis } from './asunc.js'
let products = await new Apis().Get_prod()
let tableBody = document.querySelector('#Product_table_body')
let Add_color = document.querySelector('#Add_color_2')
let Btn_add_color = document.querySelector('#Btn_add_color_2')
let Colors = document.querySelector('#Colors_2')

let colors = []
function ShowColor() {
	Colors.innerHTML = ''
	colors.forEach(el => {
		let color = document.createElement('div')
		color.classList.add('size-[50px]')
		color.classList.add('rounded-md')
		color.style.backgroundColor = el
		color.onclick = () => {
			colors = colors.filter(elem => el != elem)
			ShowColor()
		}
		Colors.appendChild(color)
	})
}

document.querySelector('#Close_dialog').onclick = () => {
	document.querySelector('#Edit_dialog').close()
}

function Show() {
	tableBody.innerHTML = ''
	products.forEach(product => {
		let row = document.createElement('tr')
		row.classList.add('border-b', 'hover:bg-orange-50', 'item-center')
		let div = ''
		product.color.forEach(el => {
			div += `<div class="w-6 h-6 shrink-0 rounded-full border border-gray-300" style="background-color: ${el};"></div>`
		})
		row.innerHTML = `
				<td class="p-3 md:hidden">${product.id}</td>
			  <td class="p-3"><img src="${
					product.img
				}" class="w-16 h-16 object-cover rounded" onerror="this.src='https://via.placeholder.com/64'" /></td>
	
			  <td class="p-3 font-medium">${product.name}</td>
	
			  <td class="p-3 md:hidden">${product.company}</td>
	
			  <td class="p-3 md:hidden">
				 <button onclick="alert('${
						product.info || 'Нет описания'
					}')"class="text-orange-500 underline hover:text-orange-700">Показать</button></td>
	
			  <td class="p-3 font-semibold text-orange-600">${product.count}</td>
			  
			  <td class="p-3">
				 <div class="flex gap-2 w-[5.5rem] overflow-x-scroll" style="scrollbar-width:thin; scrollbar-color: lightgrey transparent">${div}</div>
			  </td>
			  `
		let Action = document.createElement('td')
		Action.className = 'p-3'
		let Del_b = document.createElement('button')
		Del_b.innerHTML = '🗑️ Удалить'
		Del_b.className =
			'bg-red-500 hover:bg-red-600 ml-[10px] text-white text-xs px-3 py-1 rounded-full md:px-2 md:text-[10px] md:py-0'
		Del_b.onclick = () => {
			new Apis().Delete(product.id)
			Show()
		}
		let Edit_b = document.createElement('button')
		Edit_b.innerHTML = '✏️Изменить'
		Edit_b.className =
			'bg-blue-500 hover:bg-blue-600 mr-[10px] text-white text-xs px-3 py-1 rounded-full md:px-2 md:py-0 md:text-[10px]'
		Edit_b.onclick = () => {
			colors = product.color
			document.querySelector('#Edit_dialog').showModal()
			let Edit_Form = document.querySelector('#Edit_form')
			Edit_Form['Name'].value = product.name
			Edit_Form['img'].value = product.img
			Edit_Form['desc'].value = product.info
			Edit_Form['count'].value = product.count
			Edit_Form['company'].value = product.company
			ShowColor()

			if (Btn_add_color) {
				Btn_add_color.onclick = () => {
					let find = colors.find(el => el == Add_color.value)
					if (!find) {
						colors.push(Add_color.value)
						ShowColor()
					} else {
						alert('Уже такой цвет есть')
					}
				}
			}

			Edit_Form.onsubmit = e => {
				e.preventDefault()
				let obj = {
					name: Edit_Form['Name'].value,
					img: Edit_Form['img'].value,
					info: Edit_Form['desc'].value,
					count: Edit_Form['count'].value,
					company: Edit_Form['company'].value,
					color: colors,
				}
				if ((obj.name, obj.img, obj.info, obj.count, obj.company, obj.color)) {
					new Apis().Put(product.id, obj)
					document.querySelector('#Edit_dialog').close()
					Show()
				}
			}
		}
		Action.append(Edit_b, Del_b)
		row.appendChild(Action)
		tableBody.appendChild(row)
	})
}

Show()
