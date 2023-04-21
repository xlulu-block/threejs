import * as Three from "three";
// 目标，控制3d物体进行移动
// 引入控制器,这里引入的是轨迹控制器,还有第一人称控制器等
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 创建场景
const scene = new Three.Scene();

// 创建一个透视摄像机，设置属性角度，宽高比，近远距离
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置像机位置 xyz
camera.position.set(0, 0, 10);

// 场景添加物体
const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

// 场景添加坐标辅助线,参数为辅助线的长度
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new Three.WebGLRenderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器的canvas加到body上
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过像机将场景渲染进来
// renderer.render(scene,camera)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 使用控制器,需要传入相机和画布dom
function render() {
   cube.position.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x =0;
  }
  renderer.render(scene, camera);
  // 动画帧每一帧会自动去调用
  controls.update();
  requestAnimationFrame(render);
}
render();
