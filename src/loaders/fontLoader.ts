import WebFont from "webfontloader";

export default (readyCallback: () => void) => {
	const fonts = {
		google: {
			families: ["Fira Code"],
		},
		loading: () => console.log("loading"),
		active: () => {
			readyCallback();
		},
	};
	WebFont.load(fonts);
};
