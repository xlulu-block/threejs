import * as Three from "three";
// 引入动画库
import gsap from "gsap";
// 引入gui
import dat from 'dat.gui'
// 目标:设置纹理和材质
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
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });
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
// 设置gui
const gui=new dat.GUI()
// 改变位置，设置x的值 最小，最大，每次改变，名字
gui.add(cube.position,'x').min(0).max(5).onFinishChange((value)=>{
  // 鼠标放开
  console.log(value,'放开');
})
// 设置物体颜色
const params={
  color:'#00ff00',
  move:()=>{
    gsap.to(cube.position,{x:5,duration:5,yoyo:true,repeat:-1})
  }
}
gui.addColor(params,"color").onChange((value)=>{
  console.log(value);
  // 设置颜色
  cube.material.color.set(value)
})
gui.add(cube,'visible').name('是否显示')

// gui设置文件夹
let folder=gui.addFolder('设置立方体')
// 设置立方体变为线体
folder.add(cube.material,'wireframe').name('线条实体切换')

// 立方体开始运动  fn是函数名
folder.add(params,'move').name('立方体运动')