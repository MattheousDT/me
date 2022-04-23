import { defineConfig } from "windicss/helpers";

export default defineConfig({
	theme: {
		colors: {
			pink: {
				DEFAULT: "#D84FA1",
				50: "#F5D3DA",
				100: "#F2C4D0",
				200: "#EBA7BF",
				300: "#E589B1",
				400: "#DE6CA7",
				500: "#D84FA1",
				600: "#CC2D99",
				700: "#A62588",
				800: "#811D72",
				900: "#5B1456",
			},
			sky: {
				DEFAULT: "#6D7AB0",
				50: "#E4E9F1",
				100: "#D7DDEA",
				200: "#BDC6DB",
				300: "#A2ADCD",
				400: "#8894BF",
				500: "#6D7AB0",
				600: "#525D98",
				700: "#404777",
				800: "#2E3256",
				900: "#1D1E35",
			},
			blue: {
				DEFAULT: "#45A1E4",
				900: "#1D354F",
			},
			green: {
				DEFAULT: "#85C27B",
			},
			purple: {
				DEFAULT: "#9445E4",
			},
			turquoise: {
				DEFAULT: "#48D0AF",
			},
			grey: {
				DEFAULT: "#5C6A78",
				300: "#E9E9E9",
				200: "#F6F6F6",
				100: "#FCFCFC",
			},
			white: "#fff",
			transparent: "#00000000",
		},
		container: {
			padding: "1.25rem",
			center: true,
		},
		fontFamily: {
			sans: ["Open Sans", "Lato", "sans-serif"],
			heading: ["Pragati Narrow", "Lato", "sans-serif"],
			mono: ["Fira Code", "Consolas", "monospace"],
		},
		backgroundImage: {
			gradient: "linear-gradient(180deg, #FBCED6 0%, #F8D4C5 100%)",
		},
		boxShadow: {
			card: "0px 8px 30px -6px rgba(29, 53, 79, 0.2)",
		},
	},
	plugins: [require("windicss/plugin/aspect-ratio")],
});
