import WebFont from "webfontloader";

export default (readyCallback: () => void) => {
	const fonts = {
		google: {
			families: ["VT323", "Press Start 2P", "Fira Code"],
		},
		loading: () => console.log("loading"),
		active: () => {
			readyCallback();
		},
	};
	WebFont.load(fonts);
};
