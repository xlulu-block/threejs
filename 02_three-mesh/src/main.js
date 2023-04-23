import * as Three from "three";
// 目标:打造酷炫三角形
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

// 随机生成50个三角形
for (let i = 0; i < 50; i++) {
  const geometry = new Three.BufferGeometry();
  const positionArray = new Float32Array(9);
  // 每一个三角形需要三个顶点，每一个顶点需要三个值（x,y,z）
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 5;
  }
  // 将顶点信息加入geometry   vertices  每三个为一组数据
  geometry.setAttribute(
    "position",
    new Three.BufferAttribute(positionArray, 3)
  );
  // 随机颜色
  let color = new Three.Color(Math.random(), Math.random(), Math.random());
  const material = new Three.MeshBasicMaterial({ color });
  // 根据集合体和材质创建物体
  const mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);
}

// 场景添加坐标辅助线,参数为辅助线的长度
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new Three.WebGLRenderer();
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器的canvas加到body上
document.body.appendChild(renderer.domElement);


// 监听鼠标书双击事件,控制屏幕全屏
window.addEventListener("dblclick", () => {
  console.log("点击");
  // 查看是否有全屏元素
  const isFull = document.fullscreenElement;
  if (!isFull) {
    // 将渲染器中的画布全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏不需要在画布上退出
    document.exitFullscreen();
  }
});

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器的阻尼，操作上带来重量感
controls.enableDamping = true;

// 使用控制器,需要传入相机和画布dom
function render() {
  renderer.render(scene, camera);
  // 动画帧每一帧会自动去调用
  controls.update();
  requestAnimationFrame(render);
}
render();

// 监听屏幕缩放变化
window.addEventListener("resize", () => {
  //更新摄像头 重新计算宽高比
  camera.aspect = window.innerWidth / window.innerHeight;

  // 更新投影矩阵
  camera.updateProjectionMatrix();

  // 更新渲染器 传入宽高
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 设置像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});

