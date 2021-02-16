
uniform vec3 uColor;
uniform vec3 uPosition;
uniform vec3 uRotation;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
varying float vTime;


float random(vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}


void main()
{
    float r = sin(vTime + vUv.y * 21.) *  cos(vTime +vUv.x * 21.) * random(vUv);
    float g = sin(vTime - vUv.y * 24. ) *  cos(vTime + vUv.x * 22.) * random(vUv);
    float b = sin(vTime + vUv.y * 23.) *  cos(vTime + vUv.x * 23.) * random(vUv);

    float a = sin(vTime + vUv.y * 23.) /  cos(vTime + vUv.x * 21.) * random(vUv) ;


    gl_FragColor = vec4(r , g, b, a);

}
