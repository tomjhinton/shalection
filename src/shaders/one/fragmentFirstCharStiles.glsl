
uniform vec3 uColor;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
varying float vTime;




void main()
{
  float r = sin(vTime + vUv.x);
  float g = sin(vTime + vUv.y * 20.);
  float b = mod(vUv.x / vUv.y, 1.0);


    gl_FragColor = vec4(r, g, b, 1.0);

}
