import * as Three from "three";
// 目标:纹理算法自动缩放
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

// 添加物体 BoxBufferGeometry 是 Three.js 中的一个几何体对象  参数长宽高
const cubeGeometry=new Three.BoxGeometry(1,1,1)

// 设置纹理
const textureLoader=new Three.TextureLoader()

// 路径从dist文件下开始读取
const texture=textureLoader.load('./textures/1.jpg')
// 设置中心点，默认的是0，0左下角
texture.center.set(0.5,0.5)
// 纹理图片旋转45度
// texture.rotation=Math.PI/4
// 纹理显示算法设置  最大和最小差值
texture.magFilter=Three.NearestFilter
texture.minFilter=Three.NearestFilter
texture.minFilter=Three.LinearFilter

// 材质  是一种 Three.js 材质类型，它提供基本的不受光照影响的颜色或纹理贴图效果。
const basicMaterial=new Three.MeshBasicMaterial({
  color:'skyblue',
  map:texture
})

//Mesh 将一个几何体和材质组合成一个 Mesh 对象后，可以将它添加到场景中进行渲染。
const cube=new Three.Mesh(cubeGeometry,basicMaterial)
scene.add(cube)

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
