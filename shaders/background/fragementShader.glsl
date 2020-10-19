// Source: https://www.shadertoy.com/view/4dBSRK

precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 px = 4.0 * (-u_resolution.xy + 2.0*gl_FragCoord.xy) / u_resolution.y;
    float id = 0.5 + 0.5 * cos(u_time + sin(dot(floor(px+0.5), vec2(113.1, 17.81))) * 43758.545);
    vec3 co = 0.5 + 0.5 * cos(u_time + 2.0 * id + vec3(0.0, 1.0, 2.0));
    vec2 pa = smoothstep(0.0, 0.2, id * ( 0.5 + 0.5 * cos(6.2831 * px)));


    gl_FragColor = vec4(co * pa.x * pa.y, 1.0);
}
