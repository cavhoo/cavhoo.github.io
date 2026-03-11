import { Filter, GlProgram, GpuProgram, Shader } from "pixi.js";

export type GPUProgramShaderPart = { source: string; entryPoint: string };

export enum ShaderUniformTypes {
  f32 = "f32",
}

export class ShaderBuilder {
  protected glProgram: { vertex: string; fragment: string };
  protected gpuProgram: GpuProgram;
  protected resources?: Record<string, { [key: string]: { value: unknown; type: ShaderUniformTypes } }> = {};

  protected constructor() {}

  public static create(): ShaderBuilder {
    return new ShaderBuilder();
  }

  public addGLProgram(fragment: string, vertex: string): this {
    this.glProgram = { vertex, fragment };
    return this;
  }

  public addGPUProgram(fragment: GPUProgramShaderPart, vertex: GPUProgramShaderPart): this {
    this.gpuProgram = new GpuProgram({ fragment, vertex });
    return this;
  }

  public addResource(key: string, value: unknown, type: ShaderUniformTypes): this {
    this.resources["shaderUniforms"] = { ...this.resources["shaderUniforms"], [key]: { value, type } };
    return this;
  }

  public buildShader(): Filter {
    return new Filter({
      glProgram: new GlProgram(this.glProgram),
      resources: this.resources,
    });
  }
}
