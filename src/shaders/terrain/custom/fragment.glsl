uniform vec3 uValleyColor;
uniform vec3 uPeakColor;

varying vec3 vPosition;

void main() {
    vec3 color = vec3(1.0);

    float colorMix = smoothstep(-1.0, 1.0, vPosition.y);
    color = mix(uValleyColor, uPeakColor, colorMix);    

    csm_DiffuseColor = vec4(color, 1.0);
}