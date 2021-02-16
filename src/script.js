import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'




import vertexShader1 from './shaders/one/vertex.glsl'
import fragmentShader1 from './shaders/one/fragment.glsl'


/**
 * Base
 */
// Debug




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color( 0xffffff );

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/texture.png')

/**
 * Test mesh
 */

//geometry
// const geometry =  new THREE.PlaneGeometry( 1, 1, 100, 100 )

// const geometry = new THREE.SphereGeometry(4,128, 128)

const geometry =  new THREE.BoxGeometry( 2, 2, 2, 100, 100, 100 )



// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader1,
  fragmentShader: fragmentShader1,
  transparent: true,
  depthWrite: false,
  clipShadows: true,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uColor: {
      value: new THREE.Color('orange')
    },
    uTexture: {
      value: texture
    },
    uMouse: {
      value: {x: 0.5, y: 0.5}
    },
    uResolution: { value: { x: window.innerWidth, y: window.innerHeight} },
    uPosition: {
      value: {
        x: 0
      }
    },
    uRotation: {
      value: {

      }
    }
  }
})

console.log(material)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
console.log(mesh)

window.addEventListener('mousemove', function (e) {
  material.uniforms.uMouse.value.x =  (e.clientX / window.innerWidth) * 2 - 1
  material.uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1

})

// Grid

const
  materialG = new THREE.LineBasicMaterial({
    color: 'green',
    linewidth: 1
  }),
  materialG2 = new THREE.LineBasicMaterial({
    color: 'cyan'
  })

console.log(materialG)

const size = 400,
  steps = 4

const points = []
for (let i = -size; i <= size; i += steps) {
  //draw lines one way
  points.push(new THREE.Vector3(-size, -0.04, i))
  points.push(new THREE.Vector3(size, -0.04, i))

  //draw lines the other way
  points.push(new THREE.Vector3(i, -0.04, -size))
  points.push(new THREE.Vector3(i, -0.04, size))
}


const geometryG = new THREE.BufferGeometry().setFromPoints( points )
const line = new THREE.Line(geometryG, materialG)
const line2 = new THREE.Line(geometryG, materialG2)

line.position.y = - 3
line2.position.y = + 3




scene.add(line, line2)


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{

  //Update uniforms
  if (material.uniforms.u_resolution !== undefined){
    material.uniforms.u_resolution.value.x = window.innerWidth
    material.uniforms.u_resolution.value.y = window.innerHeight
  }
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0.25, - 0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.localClippingEnabled = true
renderer.globalClippingEnabled = true

/**
 * Animate
 */


const clock = new THREE.Clock()

const tick = () =>{
  const elapsedTime = clock.getElapsedTime()
  // console.log(camera)
  //Update Material
  material.uniforms.uTime.value = elapsedTime
  material.uniforms.uPosition.value = mesh.position
  material.uniforms.uRotation.value = mesh.rotation


  // mesh.rotation.z +=0.001
  // Update controls
  controls.update()
  mesh.position.copy(camera.position)


  // Render
  renderer.render(scene, camera)



  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
