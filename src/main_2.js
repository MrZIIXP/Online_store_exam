import { Apis, data_ } from './asunc.js'

class Create {
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

export class ShowProduct {
	constructor() {
		this.DOM_Elements()
		this.DOM_Events()
		this.autoScroll()
	}
	DOM_Elements() {
		this.box_prod = document.querySelector('#box_prod')
		this.left = document.querySelector('#left')
		this.right = document.querySelector('#right')
	}

	#interval = 2500
	#cnt = 2
	#scrollSpeed = window.screen.width - 21
	#scrollSpeed_2 = 406
	autoScroll() {
		if (!this.#scroll_click) {
			if (window.screen.width >= 510) {
				const maxScroll = this.box_prod.scrollWidth - this.box_prod.clientWidth

				if (this.box_prod.scrollLeft + this.#scrollSpeed_2 >= maxScroll) {
					this.box_prod.scrollTo({ left: 0 })
					this.#cnt = 2
				} else {
					this.box_prod.scrollBy({
						left: this.#scrollSpeed_2,
						behavior: 'smooth',
					})
					if (document.querySelector(`.Card_${this.#cnt}`)) {
						document.querySelector(`.Card_${this.#cnt}`).style.scale = '1.05'
						document.querySelector(`.Card_${this.#cnt}`).style.transition =
							'scale 0.3s ease-in-out'
						this.#cnt += 1
					}
				}
				setTimeout(() => {
					this.autoScroll()
				}, this.#interval)
				setTimeout(() => {
					if (document.querySelector(`.Card_${this.#cnt - 1}`)) {
						document.querySelector(`.Card_${this.#cnt - 1}`).style.scale =
							'1.00'
						document.querySelector(`.Card_${this.#cnt - 1}`).style.transition =
							'scale 0.3s ease-in-out'
					}
				}, this.#interval * 2)
			} else {
				const maxScroll = this.box_prod.scrollWidth - this.box_prod.clientWidth

				if (this.box_prod.scrollLeft + this.#scrollSpeed >= maxScroll) {
					this.box_prod.scrollTo({ left: 0 })
					this.#cnt = 2
				} else {
					this.box_prod.scrollBy({
						left: this.#scrollSpeed,
						behavior: 'smooth',
					})
					if (document.querySelector(`.Card_${this.#cnt}`)) {
						document.querySelector(`.Card_${this.#cnt}`).style.scale = '1.05'
						document.querySelector(`.Card_${this.#cnt}`).style.transition =
							'scale 0.3s ease-in-out'
						this.#cnt += 1
					}
				}
				setTimeout(() => {
					this.autoScroll()
				}, this.#interval)
				setTimeout(() => {
					if (document.querySelector(`.Card_${this.#cnt - 1}`)) {
						document.querySelector(`.Card_${this.#cnt - 1}`).style.scale =
							'1.00'
						document.querySelector(`.Card_${this.#cnt - 1}`).style.transition =
							'scale 0.3s ease-in-out'
					}
				}, this.#interval * 2)
			}
		} else {
			setTimeout(() => {
				this.#scroll_click = false
				this.autoScroll()
			}, 1000)
		}
	}
	#scroll_click = false
	DOM_Events() {
		this.left.onclick = () => {
			this.#scroll_click = true
			this.box_prod.scrollBy({
				left: this.#scrollSpeed * -1,
				behavior: 'smooth',
			})
			this.#cnt -= 1
		}
		this.right.onclick = () => {
			this.#scroll_click = true
			this.box_prod.scrollBy({ left: this.#scrollSpeed, behavior: 'smooth' })
			this.#cnt += 1
		}
	}

	Draw_Products(data) {
		this.box_prod.innerHTML = ''
		if (data.length > 0) {
			data.reverse().forEach((el, ind) => {
				let card = document.createElement('a')
				if (window.screen.width) card.style.width = '387px'
				else card.style.width = '387px'
				card.style.height = '278px'
				card.style.display = 'flex'
				card.style.flexDirection = 'column'
				card.style.alignItems = 'center'
				card.style.justifyContent = 'space-between'
				card.innerHTML = `
			<img src="${el.img}" style="width: 100%; height: 200px; background-color:black;"/>
			<p class="text-gray-400 font-medium">${el.name}</p>
			<p class="font-semibold">$${el.count}</p>
			`
				card.style.boxShadow = '0px 6px 5px -2px gray'
				card.href = './Product_info.html'

				card.onclick = () => {
					localStorage.setItem(
						'ID',
						JSON.stringify(
							new Create(
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
				card.classList.add(`shrink-0`)
				card.classList.add(`md:w-full`)
				card.classList.add(`Card_${ind}`)
				card.onmouseenter = () => {
					card.style.scale = '1.05'
					card.style.transition = 'scale 0.5s ease-in-out'
				}
				card.onmouseleave = () => {
					card.style.scale = '1'
					card.style.transition = 'scale 0.5s ease-in-out'
				}
				this.box_prod.appendChild(card)
			})
		} else {
			this.box_prod.innerHTML = `<img src="/src/imgs/ec0de7d7-4332-4c5c-b482-6e477d5b6451.jpg" class="w-full object-cover h-full"></img>`
		}
	}
}
