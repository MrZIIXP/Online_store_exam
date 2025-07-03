import { Apis } from './asunc.js'

class CreateProd {
	constructor(img, name, company, info, count, id, color) {
		this.img = img
		this.name = name
		this.company = company
		this.info = info
		this.count = count
		this.id = id
		this.color = color
	}
}

export class ShowProd {
	constructor() {
		this.DOM_Elements()
		this.DOM_Events()
	}
	DOM_Elements() {
		this.box_prod = document.querySelector('#box_prod_1')
		this.search = document.querySelector('#search')
		this.select = document.querySelector('#select')
		this.range = document.querySelector('#price')
		this.value = document.querySelector('#value')
	}

	DOM_Events() {
		this.search.oninput = () => {
			new Apis()
		}
		this.range.oninput = () => {
			new Apis()
			this.value.innerHTML = `Value: $${this.range.value}`
		}
		this.select.onchange = () => {
			new Apis()
		}
	}

	Draw_Products(data) {
		this.box_prod.innerHTML = ''
		data
			.reverse()
			.filter(el => Number(el.count) <= this.range.value)
			.filter(el =>
				this.select.value ? `${el.company}` == this.select.value : el
			)
			.filter(el =>
				el.name.toLowerCase().includes(this.search.value.trim().toLowerCase())
			)
			.forEach(el => {
				let dom = document.createElement('div')
				dom.className = 'relative w-[310px] md:w-full h-[278px] border'
				let card = document.createElement('a')
				card.classList.add('w-[310px]')
				card.classList.add('md:w-full')
				card.style.height = '278px'
				card.style.display = 'flex'
				card.style.flexDirection = 'column'
				card.style.alignItems = 'center'
				card.style.justifyContent = 'space-between'
				card.innerHTML = `
			<img src="${el.img}" id="ImG" style="width: 100%; height: 200px; background-color:black;"/>
			<p class="text-gray-400 font-medium">${el.name}</p>
			<p class="font-semibold">$${el.count}</p>
			`
				card.href = './Product_info.html'
				card.onclick = () => {
					localStorage.setItem(
						'ID',
						JSON.stringify(
							new CreateProd(
								el.img,
								el.name,
								el.company,
								el.info,
								el.count,
								el.id,
								el.color
							)
						)
					)
				}
				let Add_to_card = document.createElement('button')
				Add_to_card.innerHTML = '➕'
				Add_to_card.className =
					'p-[10px] bg-[#cccccc] absolute hidden top-[5px] left-[5px] rounded-full'

				Add_to_card.onclick = () => {
					let bag = JSON.parse(localStorage.getItem('Bag')) || []
					let found = bag.find(elem => elem.id == el.id)
					if (found) {
						bag = bag.map(elim => {
							if (elim.id == el.id) {
								return {
									color: elim.color,
									count: elim.count,
									id: elim.id,
									img: elim.img,
									name: elim.name,
									sum: elim.sum + 1,
								}
							}
							return elim
						})
					} else {
						bag.push({
							color: el.color[0],
							count: `$${el.count}`,
							id: el.id,
							img: el.img,
							name: el.name,
							sum: 1,
						})
					}
					localStorage.setItem('Bag', JSON.stringify(bag))
					Add_to_card.style.scale = "0.7"
					Add_to_card.style.transition = "scale 0.2s ease-in-out"
					setTimeout(()=>{
						Add_to_card.style.scale = "1"
						Add_to_card.style.transition = "scale 0.2s ease-in-out"
					},200)
				}

				let btn_del = document.createElement('button')
				btn_del.innerHTML = '🪣'
				btn_del.className =
					'p-[10px] bg-[#cccccc] absolute hidden top-[5px] right-[5px] rounded-full'
				btn_del.style.opacity = '0'
				btn_del.onclick = () => {
					new Apis().Delete(el.id)
					new Apis().Get()
					Check_Cart()
				}
				dom.onmouseenter = () => {
					if (JSON.parse(localStorage.getItem('User_password'))) {
						if (
							JSON.parse(localStorage.getItem('User_password')).name == 'Admin'
						) {
							btn_del.style.display = 'block'
							btn_del.style.opacity = '0'
							btn_del.style.transition = 'opacity 0.5s ease-in-out'
							setTimeout(() => (btn_del.style.opacity = '1'), 10)
						}
					}
					Add_to_card.style.display = 'block'
					Add_to_card.style.opacity = '0'
					Add_to_card.style.transition = 'opacity 0.5s ease-in-out'
					setTimeout(() => (Add_to_card.style.opacity = '1'), 10)
				}
				dom.onmouseleave = () => {
					btn_del.style.opacity = '0'
					btn_del.style.transition = 'opacity 0.5s ease-in-out'
					setTimeout(() => (btn_del.style.display = 'none'), 500)
					Add_to_card.style.opacity = '0'
					Add_to_card.style.transition = 'opacity 0.5s ease-in-out'
					setTimeout(() => (Add_to_card.style.display = 'none'), 500)
				}
				dom.append(card, btn_del, Add_to_card)
				dom.classList.add('md:flex-shrink-0')
				this.box_prod.appendChild(dom)
			})
	}
}
async function Check_Cart() {
	let data = JSON.parse(localStorage.getItem('Bag'))
	let data_check = await new Apis().Get_prod()
	let dataCheckIds = new Set(data_check.map(item => item.id))
	data = data.filter(item => item.id && dataCheckIds.has(item.id))
	localStorage.setItem("Bag", JSON.stringify(data))
}
