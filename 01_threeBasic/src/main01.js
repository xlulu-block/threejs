import * as Three from 'three'
// 目标，初步搭建threejs场景
// 创建场景
const scene=new Three.Scene()

// 创建一个透视摄像机，设置属性角度，宽高比，近远距离
const camera=new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
// 设置像机位置 xyz
camera.position.set(0,0,10)

// 场景添加物体
const geometry = new Three.BoxGeometry( 1, 1, 1 );
const material = new Three.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new Three.Mesh( geometry, material );
scene.add( cube );

// 初始化渲染器
const renderer=new Three.WebGLRenderer()
// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight)
// 将渲染器的canvas加到body上
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过像机将场景渲染进来
renderer.render(scene,camera)

