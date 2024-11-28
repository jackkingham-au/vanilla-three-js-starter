uniform bool uToonShader;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform vec3 uLightDirection;
uniform bool uAmbientLight;
uniform vec3 uValleyColor;
uniform vec3 uPeakColor;

varying vec3 vNormal;
varying vec3 vPosition;

#define AMBIENT_LIGHT_INTENSITY 0.25
#define AMBIENT_LIGHT_COLOR vec3(1.0)
#define TOON_LEVELS 3.0

vec3 quantize(vec3 value) {
    return floor(value * TOON_LEVELS) / TOON_LEVELS;
}

float quantize(float value) {
    return floor(value * TOON_LEVELS) / TOON_LEVELS;
}

vec3 ambientLight() {
    return AMBIENT_LIGHT_COLOR * AMBIENT_LIGHT_INTENSITY;
}

vec3 directionalLight(vec3 normal) {
    float diffuse = 0.0;

    diffuse = max(dot(normal, normalize(uLightDirection)), 0.0);

    if (uToonShader) diffuse = quantize(diffuse);

    return vec3(uLightIntensity * diffuse);
}

void main() {
    vec3 color = vec3(1.0);
    vec3 normal = normalize(vNormal);

    float colorMix = smoothstep(-1.0, 1.0, vPosition.y);
    color = mix(uValleyColor, uPeakColor, colorMix);

    vec3 light = directionalLight(normal);
    
    if (uAmbientLight) light += ambientLight();

    if (uToonShader) light = quantize(light);

    color *= (light + vec3(0.5));

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
}