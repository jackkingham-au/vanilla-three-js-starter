varying vec3 vNormal;
varying vec3 vPosition;

#include "../../lygia/generative/psrdnoise.glsl"
#include "../../lygia/generative/snoise.glsl"

#define FBM_OCTAVES 3
#define FBM_NOISE_FNC(UV) psrdnoise(UV)
#define FBM_SCALE_SCALAR 1.25

#include "../../lygia/generative/fbm.glsl"

#define SLOPE_CENTER_POINT vec2(-2.5)

float slope(vec2 position) {
    float BASE_WIDTH = 4.0;
    float HEIGHT_SCALAR = 3.0;

    float distanceToCenter = distance(position, SLOPE_CENTER_POINT) / BASE_WIDTH;
    float height = 1.0 - distanceToCenter; 
    height = smoothstep(0.05, 1.0, height) * HEIGHT_SCALAR;

    return height;
}

float noise(vec2 position) {
    return fbm(position) + slope(position);
} 

/** 
 * Computing normals using the `neighbours technique`. This doesn't work for all geometries. Suited for planes.
 * 
 * Estimates the normal by looking at the neighbouring points.
 */
vec3 computeNormals(vec3 modelPosition) {
    float POSITION_SHIFT = 0.01;

    vec3 modelPositionA = modelPosition + vec3(POSITION_SHIFT, 0.0, 0.0);
    vec3 modelPositionB = modelPosition + vec3(0.0, 0.0, -POSITION_SHIFT);

    modelPositionA.y = noise(modelPositionA.xz);
    modelPositionB.y = noise(modelPositionB.xz);

    vec3 toA = normalize(modelPositionA - modelPosition);
    vec3 toB = normalize(modelPositionB - modelPosition);

    return cross(toA, toB);
}

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y += noise(modelPosition.xz);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;

    vNormal = computeNormals(modelPosition.xyz);
    vPosition = modelPosition.xyz;
}