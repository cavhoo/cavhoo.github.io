precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;


const int MAX_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

float sphereSignedDistance(vec3 point) {
    return length(point) - 1.0;
}

float sceneSignedDistance(vec3 point) {
    return sphereSignedDistance(point);
}

float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for ( int i = 0; i < MAX_STEPS; i++ ) {
        float dist = sceneSignedDistance(eye + depth * marchingDirection);
        if (dist < EPSILON) return depth;

        depth += dist;
        if (depth >= end) {
            return end;
        }
    }
    return end;
}

vec3 rayDirection(float fov, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fov) / 2.0);
    return normalize(vec3(xy, -z));
}

void main() {
    vec3 dir = rayDirection(45., u_resolution, gl_FragCoord.xy);
    vec3 eye = vec3(0., 0., 5.);
    float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);
    if (dist > MAX_DIST - EPSILON) {
        gl_FragColor = vec4(0.0);
        return;
    }
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
