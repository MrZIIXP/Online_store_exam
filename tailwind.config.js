/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			fontFamily: {
				cur: ['Cur'],
			},
		},
		screens: {
			md: { max: '510px' },
		},
	},
	plugins: [],
}
