import { ShaderBuilder, ShaderUniformTypes } from "../shader";
const vertexShader = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}`;

const fragmentShader = `
in vec2 vTextureCoord;

out vec4 finalColor;

// Custom uniforms
uniform float uTime;
uniform float uScale;
float amplitude = 0.012;
float frequency = 2.0;
float speed = 0.2;
float baseStability = 0.64;

// Built in uniforms
uniform sampler2D uTexture;

void main()
{
    vec2 uvs = vTextureCoord.xy;

    float swayAmount = amplitude * (1.0 / uScale - smoothstep(0.6, 0.63, vTextureCoord.y) / uScale);
    float wave = sin(vTextureCoord.y * frequency + uTime * speed);
    wave += 0.3 * sin(vTextureCoord.y * frequency * 1.5 + uTime * speed * 0.8);
    uvs.x += wave * swayAmount;
    uvs.x += 0.2 * swayAmount * sin(vTextureCoord.y * frequency * 0.5 + uTime * speed * 0.5);

    uvs.x = mod(uvs.x, 1.0);

    finalColor = texture2D(uTexture, uvs);
}`;

export const TreeShader = ShaderBuilder.create()
  .addGLProgram(fragmentShader, vertexShader)
  .addResource("uTime", 0.0, ShaderUniformTypes.f32)
  .addResource("uScale", 1.0, ShaderUniformTypes.f32);
