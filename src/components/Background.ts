import { Container, Geometry, Graphics, Mesh, MeshMaterial, Shader } from "pixi.js";

export class Background extends Container {
	private mesh: Mesh;
	constructor() {
		super();
		this.init();
	}

	private init() {
		this.loadShaders();
	}

	private loadShaders = async () => {
		const fragmentSource = await (await fetch("/shaders/background/fragementShader.glsl")).text();
		const vertexSource = await (await fetch("/shaders/background/vertexShader.glsl")).text();

		const geom = new Geometry()
			.addAttribute("aVertexPosition", [0, 0, 1280, 0, 1280, 720, 0, 720], 2)
			.addAttribute("aColor", [1, 1, 0, 0, 1, 0, 2, 0, 1], 3)
			.addIndex([0, 1, 2, 0, 2, 3]);

		const uniforms = {
			u_time: 0,
			u_resolution: [1280, 720],
		};

		const shader = Shader.from(vertexSource, fragmentSource, uniforms);

		this.mesh = new Mesh(geom, shader as MeshMaterial);
		this.addChild(this.mesh);

		const readLayer = new Graphics();
		readLayer.beginFill(0x3b3b3b, 0.75);
		readLayer.drawRect(15, 15, 1250, 690);
		readLayer.endFill();

		this.addChild(readLayer);
	};

	public update(delta: number) {
		this.mesh.shader.uniforms.u_time += delta / 100;
	}
}
