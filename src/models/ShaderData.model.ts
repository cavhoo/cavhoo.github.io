import { Shader } from "pixi.js";

export interface ShaderData {
  fragmentSource: string,
  vertexSource: string
}

export interface PixiShader {
  fragmentShader: Shader
}
