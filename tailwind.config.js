/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				title: 'FC Fast, sans-serif',
				content: 'Roboto Condensed, sans-serif'
			}
		}
	},
	plugins: []
};
