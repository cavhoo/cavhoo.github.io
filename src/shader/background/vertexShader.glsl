precision mediump float;
attribute vec2 aVertexPosition;
attribute vec3 aColor;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec3 vColor;

void main() {
    vColor = aColor;
    gl_Position = vec4((projecttionMatrix * translationMatrix * vec3(aVertexPosition, 0.5)).xy, 0.0, 1.0);
}
