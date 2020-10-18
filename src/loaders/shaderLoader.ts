import {Shader} from 'pixi.js'
import { ShaderData } from '../models/ShaderData.model'

class ShaderLoader {
  private _shaders: {[key: string]: { fragmentSource: string, vertexSource: string}}
  private _loadableShaders: {}

  constructor() {
    this._shaders = {}
  }

  public addShaderSource(id:string, fragmentPath: string, vertexPath: string) {

  }

  private loadShaders = async (shaders: {id: string, fragmentPath: string, vertexPath: string}[]) => {
    for (var i = 0; i < shaders.length; i++) {
      const newShaderData: ShaderData = {
        fragmentSource: "",
        vertexSource: ""
      }
      const nextShader = shaders[i]
      const fragmentCode = await fetch(nextShader.fragmentPath)
      newShaderData.fragmentSource = await fragmentCode.text()
      if (nextShader.vertexPath) {
        const vertexCode = await fetch(nextShader.vertexPath)
        newShaderData.vertexSource = await vertexCode.text()
      }

      this._shaders[nextShader.id] = newShaderData
    }
  }

  public getShader(id: string) {
    return this._shaders[id] ?? null
  }
}

export default new ShaderLoader()
