/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				title: 'Righteous, cursive',
				content: 'Roboto Condensed, sans-serif'
			}
		}
	},
	plugins: []
};
