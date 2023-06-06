import { Container, Text, TextStyle } from "pixi.js";
import { SizeableText } from "../components/SizeableText";
import { FONT } from "../constants/Styles";
import EventListener, { EVENT } from "../utils/EventListener";
import { ILinkText, LinkText } from "../components/LinkText";

interface IProject {
	title: string;
	content: string;
	link?: ILinkText;
	technologies: string[];
}

const projects: IProject[] = [
	{
		title: "Classvizion 3D",
		content: [
			"A tool to generate and display a class diagram of a given software 'src' folder.",
			"The idea is to render the diagram in 3D space for better overview of the structure.",
			"The project was born when I tried generating a diagram for the engine I am creating at work.",
			"The class structure was so dense that I couldn't read the connection.",
			"Since the project is still very early there is no public demo available.",
		].join(" "),
		technologies: ["Rust", "Vulkan"],
	},
	{
		title: "GTA 5 RP Project",
		content: [
			"A FiveM based Role Playing framework written in C#, and some ReactJS/Pixi.js for the client.",
			"It's using a PostgresSQL database to store the user information, and uses MVC development pattern,",
			"for backend and frontend alike.",
		].join(" "),
		link: {
			title: "Github FiveMForge",
			url: "https://github.com/cavhoo/fivem_forge",
		},
		technologies: ["C#", "FiveM", "ReactJS", "pixi.js"],
	},
	{
		title: "CityGenerator",
		content: [
			"A C++/OpenGL based procedural generation of a city scape. A few years ago I read a blog post about something",
			"where someone did the same. So last year or so I started the same, it's a project I spend sometime",
			"in every now and then as it requires a lot of focus and learning from my side. So I am mostly working on it when I",
			"can afford a whole day to spend in from of my PC",
		].join(" "),
		link: {
			title: "Github CityGenerator",
			url: "https://github.com/cavhoo/opengl_city",
		},
		technologies: ["C++", "OpenGL", "GLUT"],
	},
	{
		title: "cavhoo.github.io",
		content: [
			"My github portfolio page created with PixiJS. So this website is a canvas based website, and I use it as",
			"a playground to test new things. So you might see stuff change from time to time. My idea is to use this",
			"website to showcase some techniques that I learned now and then. So some shader effects and other funny rendering",
		].join(" "),
		link: { title: "Source Code", url: "https://github.com/cavhoo/cavhoo.github.io" },
		technologies: ["typescript", "pixi.js", "webpack", "GLSL"],
	},
];

const titleStyle = {
	fontSize: FONT.FONT_SIZE_TITLE + 10,
	fontFamily: FONT.FONT_FAMILY,
	fill: FONT.COLOR_DEFAULT,
} as TextStyle;

const contentStyle = {
	fontSize: FONT.FONT_SIZE_CONTENT - 5,
	fontFamily: FONT.FONT_FAMILY,
	lineHeight: FONT.LINE_SPACING_CONTENT,
	fill: FONT.COLOR_DEFAULT,
} as TextStyle;

export class Projects extends Container {
	private _maxHeight: number = 600;
	constructor() {
		super();
		this.init();
	}

	private init() {
		EventListener.addListener(EVENT.ONSCROLL, this.onScroll);

		let lastY = 10;
		projects.forEach((project) => {
			const projectWrapper = new Container();
			const title = new Text(project.title, titleStyle);
			projectWrapper.addChild(title);

			const content = new SizeableText(project.content, contentStyle, 900);
			content.position.set(0, title.height + 15);
			projectWrapper.addChild(content);

			const technologies = new Text(project.technologies.join(" | "), contentStyle);
			technologies.position.set(0, content.position.y + content.height + 15);
			projectWrapper.addChild(technologies);

			if (project.link) {
				const link = new LinkText(project.link, contentStyle);
				link.position.set(0, technologies.position.y + technologies.height + 15);
				projectWrapper.addChild(link);
			}

			projectWrapper.position.set(0, lastY);

			this.addChild(projectWrapper);
			lastY += projectWrapper.height + 15;
		});
	}

	private onScroll = (event: WheelEvent) => {
		if (this.visible) {
			const { deltaY } = event;
			if (deltaY > 0) {
				if (this.position.y >= this._maxHeight - this.height) {
					this.position.y -= Math.abs(deltaY);
				}
			} else {
				if (this.position.y < 0) {
					this.position.y += Math.abs(deltaY);
				}
			}
		}
	};
}
