import { Apis } from './asunc.js'

export class Create_Products_Cart {
	constructor(img, name, count, id, sum, color) {
		this.img = img
		this.name = name
		this.count = count
		this.id = id
		this.sum = sum
		this.color = color
	}
}
let data_color = []
export class bag {
	constructor() {
		this.data = JSON.parse(localStorage.getItem('Bag')) || []
		this.RegForm = document.querySelector('#RegForm')
		this.LogForm = document.querySelector('#LogForm')
		this.Edit_acc = document.querySelector('#Edit_acc')
		this.Add_color = document.querySelector('#Add_color')
		this.Btn_add_color = document.querySelector('#Btn_add_color')
		this.Colors = document.querySelector('#Colors')
		this.Start()
		this.AdminCreature()
		this.CheckUsers()
	}
	#data_2 = []
	#all_cnt = Number(localStorage.getItem('CNT')) || 0
	#all_sum = Number(localStorage.getItem('SUM')) || 0
	Start() {
		localStorage.setItem('Bag', JSON.stringify(this.data))
		document.querySelector('#OpenCard').onclick = () => {
			document.querySelector('#CardDial').showModal()
			this.Show(this.data)
		}
		document.querySelector('#closeCard').onclick = () => {
			document.querySelector('#CardDial').close()
		}
		document.querySelector('#Check').onclick = () => {
			if (JSON.parse(localStorage.getItem('User_password'))) {
				let dialog = document.querySelector('#CheckoutDialog')
				let tbody = document.querySelector('#Tbody')
				tbody.innerHTML = ''
				let currentData = JSON.parse(localStorage.getItem('Bag')) || []
				let cnt = []
				currentData.forEach(item => {
					if (!cnt.includes(item.id)) {
						let col = '<div class="size-[60px] flex items-center flex-wrap">'
						let sums = 0
						currentData.forEach(el => {
							if (item.id == el.id) {
								col += `<div class="size-[20px] mx-[5px] shrink-0" style="background-color:${el.color};"></div>`
								sums += el.sum
							}
						})
						let row = document.createElement('tr')
						row.className = 'border-b border-gray-200'

						row.innerHTML = `
            <td class="py-[10px] pr-[10px]"><img src="${
							item.img
						}" class="w-[60px] h-[40px] rounded"/></td>
            <td class="py-[10px] pr-[10px]">${item.name}</td>
            <td class="py-[10px]">${item.count}</td>
            <td class="py-[10px] pr-[10px]">${sums}</td>
            <td class="py-[10px] pr-[10px]">${col + '</div>'}</td>
				<td class="py-[10px]">${(sums * item.count.slice(1, item.count.length)).toFixed(
					1
				)}</td>
        `
						cnt.push(item.id)
						tbody.appendChild(row)
					}
				})
				document.querySelector(
					'#All_SUM'
				).innerHTML = `Result: $${this.#all_sum.toFixed(1)}`
				dialog.showModal()
			} else {
				document.querySelector('#RegisterDialog').showModal()
			}
		}
		document.querySelector('#confirmOrder').onclick = () => {
			document.querySelector('#CheckoutDialog').close()
			document.querySelector('#CardDial').close()
			let thancks = document.querySelector('#Thancks')
			thancks.style.display = 'flex'
			thancks.style.opacity = '1'
			thancks.style.transition = 'opacity 1s ease-in-out'
			setTimeout(() => (thancks.style.opacity = '0'), 100)
			setTimeout(() => (thancks.style.display = 'none'), 1100)
			localStorage.setItem('Bag', null)
			this.Show()
			this.CheckUsers()
		}
		document.querySelector('#I_H_Acc').onclick = () => {
			document.querySelector('#RegisterDialog').close()
			document.querySelector('#LoginDialog').showModal()
		}
		document.querySelector('#I_HN_Acc').onclick = () => {
			document.querySelector('#RegisterDialog').showModal()
			document.querySelector('#LoginDialog').close()
		}
		document.querySelector('#Log').onclick = () => {
			document.querySelector('#LoginDialog').showModal()
		}
		document.querySelector('#Log_mb').onclick = () => {
			document.querySelector('#LoginDialog').showModal()
		}
		document.querySelector('#Reg').onclick = () => {
			document.querySelector('#RegisterDialog').showModal()
		}
		document.querySelector('#Reg_mb').onclick = () => {
			document.querySelector('#RegisterDialog').showModal()
		}
		document.querySelector('#OpenMenu').onclick = () => {
			document.querySelector('#Menu').showModal()
		}
		if (this.Btn_add_color) {
			this.Btn_add_color.onclick = () => {
				let find = this.#data_2.find(el => el == this.Add_color.value)
				if (!find) {
					this.#data_2.push(this.Add_color.value)
					data_color = this.#data_2
					this.ShowColor()
				} else {
					alert('Уже такой цвет есть')
				}
			}
		}
		this.RegForm.onsubmit = async e => {
			e.preventDefault()
			let data = await new Apis().Get_User()
			let find = Object.values(data).find(
				el => el.name == this.RegForm['Name'].value
			)
			if (
				this.RegForm['password_1'].value == this.RegForm['password_2'].value &&
				!find
			) {
				new Apis().Post_User({
					name: this.RegForm['Name'].value,
					password: this.RegForm['password_1'].value,
					desc: '',
					img: '',
				})
				let id = Object.values(await new Apis().Get_User()).find(
					el => el.name == this.RegForm['Name'].value
				)
				localStorage.setItem(
					'User_password',
					JSON.stringify({
						name: this.RegForm['Name'].value,
						password: this.RegForm['password_1'].value,
						id: id.id,
					})
				)
				document.querySelector('#RegisterDialog').close()
			}
		}
		this.RegForm.onreset = () => {
			document.querySelector('#RegisterDialog').close()
		}
		this.LogForm.onsubmit = async e => {
			e.preventDefault()
			let data = await new Apis().Get_User()
			let name = data.find(el => {
				if (
					el.name == this.LogForm['Name'].value &&
					el.password == this.LogForm['password_1'].value
				) {
					return true
				}
				return false
			})
			let full_us = data.find(el => el.name == this.LogForm['Name'].value)
			if (name) {
				localStorage.setItem('User_password', JSON.stringify(full_us))
				document.querySelector('#LoginDialog').close()
			}
			this.AdminCreature()
		}
		this.LogForm.onreset = () => {
			document.querySelector('#LoginDialog').close()
		}
		document.querySelector('#closeCheckout').onclick = () => {
			document.querySelector('#CheckoutDialog').close()
		}
		document.querySelector('#Account').onclick = () => {
			document.querySelector('#editDialog').showModal()
			this.Edit_acc['Name'].value = JSON.parse(
				localStorage.getItem('User_password')
			).name
			this.Edit_acc['password'].value = JSON.parse(
				localStorage.getItem('User_password')
			).password
			if (JSON.parse(localStorage.getItem('User_password')).img) {
				this.Edit_acc['img'].value = JSON.parse(
					localStorage.getItem('User_password')
				).img
			}
			if (JSON.parse(localStorage.getItem('User_password')).desc) {
				this.Edit_acc['Description'].value = JSON.parse(
					localStorage.getItem('User_password')
				).desc
			}
		}
		document.querySelector('#Account_mb').onclick = () => {
			document.querySelector('#editDialog').showModal()
			this.Edit_acc['Name'].value = JSON.parse(
				localStorage.getItem('User_password')
			).name
			this.Edit_acc['password'].value = JSON.parse(
				localStorage.getItem('User_password')
			).password
			if (JSON.parse(localStorage.getItem('User_password')).img) {
				this.Edit_acc['img'].value = JSON.parse(
					localStorage.getItem('User_password')
				).img
			}
			if (JSON.parse(localStorage.getItem('User_password')).desc) {
				this.Edit_acc['Description'].value = JSON.parse(
					localStorage.getItem('User_password')
				).desc
			}
		}
		this.Edit_acc.onsubmit = async e => {
			e.preventDefault()
			if (JSON.parse(localStorage.getItem('User_password'))) {
				let data = await new Apis().Get_User()
				let name = data.find(el => {
					if (el.name == this.Edit_acc['Name'].value) {
						return true
					}
					return false
				})
				let data_1 = JSON.parse(localStorage.getItem('User_password'))
				if (!name) {
					let obj = {
						name: this.Edit_acc['Name'].value,
						password: this.Edit_acc['password'].value,
						img: this.Edit_acc['img'].value,
						desc: this.Edit_acc['Description'].value,
						id: data_1.id,
					}
					new Apis().Put_User(data_1.id, obj)
					localStorage.setItem('User_password', JSON.stringify(obj))
					document.querySelector('#editDialog').close()
				} else {
					alert('Такой ник уже есть')
					localStorage.setItem('User_password', JSON.stringify(data_1))
				}
			}
		}
		document.querySelector('#Close_menu').onclick = () => {
			document.querySelector('#Menu').close()
		}
		this.Edit_acc.onreset = () => {
			document.querySelector('#editDialog').close()
		}
		document.querySelector('#Del_acc').onclick = () => {
			new Apis().Del_User(JSON.parse(localStorage.getItem('User_password')).id)
			document.querySelector('#editDialog').close()
			localStorage.setItem('User_password', null)
			this.CheckUsers()
			this.AdminCreature()
		}
		document.querySelector('#LogOut').onclick = () => {
			localStorage.setItem('User_password', null)
			document.querySelector('#editDialog').close()
			this.AdminCreature()
			this.CheckUsers()
			document.querySelector('#create').className = 'hidden md:hidden'
			document.querySelector('#Edit').className = 'hidden md:hidden'
		}
	}
	AdminCreature() {
		if (JSON.parse(localStorage.getItem('User_password'))) {
			if (window.screen.width >= 510) {
				if (JSON.parse(localStorage.getItem('User_password')).name == 'Admin') {
					document.querySelector('#create').className = 'z-30 block md:hidden'
					document.querySelector('#Edit').className = 'z-30 block md:hidden'
				} else {
					document.querySelector('#create').className = 'hidden md:hidden'
					document.querySelector('#Edit').className = 'hidden md:hidden'
				}
			} else {
				if (JSON.parse(localStorage.getItem('User_password')).name == 'Admin') {
					document.querySelector('#create_2').className = 'md:block hidden'
					document.querySelector('#Edit_2').className = 'md:block hidden'
				} else {
					document.querySelector('#create_2').style.display = 'md:hidden hidden'
					document.querySelector('#Edit_2').style.display = 'md:hidden hidden'
				}
			}
		}
	}

	CheckUsers() {
		setInterval(async () => {
			this.AdminCreature()
			if (window.screen.width >= 510) {
				if (JSON.parse(localStorage.getItem('User_password'))) {
					if (
						JSON.parse(localStorage.getItem('User_password')).name &&
						JSON.parse(localStorage.getItem('User_password')).password
					) {
						document.querySelector('#Account').classList.remove('hidden')
						document.querySelector('#Account').classList.add('flex', 'z-30')
						document.querySelector('#Buttons').classList.remove('flex')
						document.querySelector('#Buttons').classList.add('hidden', 'z-30')
						document.querySelector('#Acc_name').innerHTML = JSON.parse(
							localStorage.getItem('User_password')
						).name
						if (JSON.parse(localStorage.getItem('User_password')).img) {
							document.querySelector('#Acc_img').src = JSON.parse(
								localStorage.getItem('User_password')
							).img
						} else {
							document.querySelector('#Acc_img').src =
								'https://tse2.mm.bing.net/th/id/OIP.gNN8E58D13375_GVNxFJvQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
						}
						document.querySelector('#Acc_img').onerror = () => {
							document.querySelector('#Acc_img').src =
								'https://tse2.mm.bing.net/th/id/OIP.gNN8E58D13375_GVNxFJvQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
						}
					}
				} else {
					document.querySelector('#Buttons').classList.add('flex')
					document.querySelector('#Buttons').classList.remove('hidden')
					document.querySelector('#Account').classList.add('hidden')
					document.querySelector('#Account').classList.remove('flex')
				}
			} else {
				if (JSON.parse(localStorage.getItem('User_password'))) {
					if (
						JSON.parse(localStorage.getItem('User_password')).name &&
						JSON.parse(localStorage.getItem('User_password')).password
					) {
						document.querySelector('#Account_mb').style.display = 'flex'
						document.querySelector('#Buttons_mb').style.display = 'none'
						document.querySelector('#Acc_name_mb').innerHTML = JSON.parse(
							localStorage.getItem('User_password')
						).name
						if (JSON.parse(localStorage.getItem('User_password')).img) {
							document.querySelector('#Acc_img_mb').src = JSON.parse(
								localStorage.getItem('User_password')
							).img
						} else {
							document.querySelector('#Acc_img_mb').src =
								'https://tse2.mm.bing.net/th/id/OIP.gNN8E58D13375_GVNxFJvQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
						}
						document.querySelector('#Acc_img_mb').onerror = () => {
							document.querySelector('#Acc_img_mb').src =
								'https://tse2.mm.bing.net/th/id/OIP.gNN8E58D13375_GVNxFJvQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3'
						}
					}
				} else {
					document.querySelector('#Buttons_mb').style.display = 'block'
					document.querySelector('#Account_mb').style.display = 'none'
				}
			}

			let sua = 0
			let all_sua = 0
			this.data = JSON.parse(localStorage.getItem('Bag')) || []
			this.data.forEach(el => (sua += el.sum))
			this.#all_cnt = sua
			this.data.forEach(
				el => (all_sua += el.sum * el.count.slice(1, el.count.length))
			)
			this.#all_sum = all_sua
			document.querySelector('#CountINCard').innerHTML = this.#all_cnt
			document.querySelector(
				'#check_value'
			).innerHTML = `$${this.#all_sum.toFixed(1)}`
			localStorage.setItem('CNT', this.#all_cnt)
			localStorage.setItem('SUM', this.#all_sum)
		}, 1000)
	}
	ShowColor() {
		this.Colors.innerHTML = ''
		this.#data_2.forEach(el => {
			let color = document.createElement('div')
			color.classList.add('size-[50px]')
			color.classList.add('rounded-md')
			color.style.backgroundColor = el
			color.onclick = () => {
				this.#data_2 = this.#data_2.filter(elem => el != elem)
				data_color = this.#data_2
				this.ShowColor()
			}
			this.Colors.appendChild(color)
		})
	}

	Show(data) {
		this.CheckUsers()
		if (data) {
			let box = document.querySelector('#box')
			box.innerHTML = ''
			box.className = `flex flex-col gap-[10px] item-center absolute bottom-[150px] w-[85%] h-[57%]`
			box.style.scrollbarWidth = 'thin'
			if (data.length > 4) {
				box.classList.add('overflow-y-scroll')
			}
			data.forEach((el, ind) => {
				let card = document.createElement('div')
				let img = document.createElement('img')
				img.src = `${el.img}`
				img.style.padding = '4px'
				img.style.borderRadius = '5px'
				img.style.border = `4px solid ${el.color}`
				img.style.height = '94px'
				let div_1 = document.createElement('div')
				let name = document.createElement('p')
				name.innerHTML = el.name
				let Add_bnt = document.createElement('button')
				Add_bnt.innerHTML = '⋙'
				Add_bnt.style.border = '4px solid orange'
				Add_bnt.style.color = 'orange'
				Add_bnt.style.borderRadius = '10px'
				Add_bnt.style.padding = '0px 7px'
				Add_bnt.style.fontSize = '20px'
				Add_bnt.onclick = () => {
					data[ind] = new Create_Products_Cart(
						el.img,
						el.name,
						el.count,
						el.id,
						Number(el.sum) + 1,
						el.color
					)
					localStorage.setItem('Bag', JSON.stringify(data))
					this.Show(data)
				}
				let Del_bnt = document.createElement('button')
				Del_bnt.innerHTML = '⋘'
				Del_bnt.style.border = '4px solid orange'
				Del_bnt.style.color = 'orange'
				Del_bnt.style.borderRadius = '10px'
				Del_bnt.style.padding = '0px 7px'
				Del_bnt.style.fontSize = '20px'
				Del_bnt.onclick = () => {
					if (Number(el.sum) > 1) {
						data[ind] = new Create_Products_Cart(
							el.img,
							el.name,
							el.count,
							el.id,
							Number(el.sum) - 1,
							el.color
						)
					} else {
						data = data.filter(elem =>
							elem.id != el.id ? elem : elem.color != el.color
						)
					}
					localStorage.setItem('Bag', JSON.stringify(data))
					this.Show(data)
				}
				let close = document.createElement('button')
				close.innerHTML = 'Ⅹ'
				close.onclick = () => {
					data = data.filter(elem =>
						elem.id != el.id ? elem : elem.color != el.color
					)
					localStorage.setItem('Bag', JSON.stringify(data))
					this.Show(data)
				}
				let cnt = document.createElement('p')
				cnt.innerHTML = el.count
				let sum = document.createElement('p')
				sum.innerHTML = el.sum
				let name_close = document.createElement('div')
				let Add_Cnt_Del = document.createElement('div')
				Add_Cnt_Del.append(Del_bnt, sum, Add_bnt)
				Add_Cnt_Del.style.display = 'flex'
				Add_Cnt_Del.style.gap = '7px'
				Add_Cnt_Del.style.alignItems = 'center'
				Add_Cnt_Del.style.marginTop = '10px'
				name_close.append(name, close)
				name_close.style.display = 'flex'
				div_1.style.width = '100%'
				name_close.style.justifyContent = 'space-between'
				div_1.append(name_close, cnt, Add_Cnt_Del)
				card.append(img, div_1)
				card.style.width = '100%'
				card.style.height = '94px'
				card.style.display = 'flex'
				card.style.gap = '16px'
				box.appendChild(card)
			})
		}
	}
}
let cart = new bag()

let btn = document.querySelector('#AddToCard')
let sel_col = ''
function ShowSel() {
	if (document.querySelector('#Sel_col')) {
		if (JSON.parse(localStorage.getItem('ID'))) {
			document.querySelector('#Sel_col').innerHTML = ''
			document.querySelector('#Sel_col').style.backgroundColor = JSON.parse(localStorage.getItem('ID')).color[0]
			JSON.parse(localStorage.getItem('ID')).color.forEach(el => {
				let Ccolor = document.createElement('option')
				Ccolor.value = el
				Ccolor.style.backgroundColor = el
				Ccolor.onclick = () => {
					document.querySelector('#Sel_col').style.backgroundColor =
						Ccolor.value
				}
				document.querySelector('#Sel_col').appendChild(Ccolor)
			})
		}
	}
}

if (document.querySelector('#Sel_col')) {
	document.querySelector('#Sel_col').onchange = () => {
		document.querySelector('#Sel_col').style.backgroundColor =
			document.querySelector('#Sel_col').value
	}
}
ShowSel()
if (btn) {
	btn.onclick = () => {
		let img = document.querySelector('#InfoImg').src
		let name = document.querySelector('#InfoName').textContent.trim()
		let cnt = document.querySelector('#InfoCnt').textContent.trim()
		let id = document.querySelector('#InfoID').textContent.trim()
		let found = cart.data.find(el => {
			if (
				`${el.id}` == id &&
				el.color == document.querySelector('#Sel_col').value
			) {
				return true
			}
			return false
		})
		if (found) {
			found.sum = Number(found.sum) + 1
		} else {
			cart.data.push(
				new Create_Products_Cart(
					img,
					name,
					cnt,
					id,
					1,
					document.querySelector('#Sel_col').value
				)
			)
		}
		localStorage.setItem('Bag', JSON.stringify(cart.data))
		cart.Show(cart.data)

		let Added = document.querySelector('#Added')
		Added.style.display = 'block'
		Added.style.opacity = '1'
		Added.style.bottom = '40px'
		Added.style.transition = 'opacity 1.5s ease-in-out, bottom 2s ease-in-out'

		setTimeout(() => {
			Added.style.opacity = '0'
			Added.style.bottom = '15px'
		}, 100)

		setTimeout(() => {
			Added.style.display = 'none'
		}, 2100)
	}
}

export { data_color }
let new_obj = JSON.parse(localStorage.getItem('ID'))
if (new_obj) {
	if (document.querySelector('#InfoTitle')) {
		document.querySelector('#InfoTitle').innerHTML = new_obj.name
		document.querySelector('#InfoImg').src = new_obj.img
		document.querySelector('#InfoCnt').innerHTML = `$${new_obj.count}`
		document.querySelector('#InfoName').innerHTML = `<p>${new_obj.name}</p>`
		document.querySelector('#InfoCompany').innerHTML = new_obj.company
		document.querySelector('#InfoInfo').innerHTML = new_obj.info
		document.querySelector('#InfoID').innerHTML = new_obj.id
	}
}
new bag()
