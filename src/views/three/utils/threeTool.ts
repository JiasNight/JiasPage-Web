import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
// 导入动画库
import gsap from 'gsap';

export default class CreateDivThree {
  dom: string;
  canvas: any;
  scene: any;
  camera: any;
  renderer: any;
  controls: any;

  constructor(dom: string) {
    this.dom = dom;
    this.canvas = document.querySelector(dom);
    console.log(this.canvas.offsetWidth);
  }

  // 初始化场景
  initThree() {
    this.initScene();
    this.initCamera();
    // this.initAxesHelper();
    this.initLight();
    this.initRenderer();
    this.initControls();
    this.windowResize();
  }

  // 初始化场景
  initScene() {
    this.scene = new THREE.Scene();
    // const floorGeometry = new THREE.PlaneGeometry(60, 60, 1);
    // const floorMaterial = new THREE.MeshPhongMaterial({
    //   color: 0x77F28F,
    //   shininess: 0
    //   // wireframe: true
    // });
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.rotation.x = -0.5 * Math.PI;
    // floor.position.y = -2.1;
    // // 地板接受阴影开启
    // floor.receiveShadow = true;
    // this.scene.add(floor);
  }

  // 初始化相机
  initCamera() {
    // 创建透视相机（角度, 宽高比, 最近距离, 最远距离）
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.offsetWidth / this.canvas.offsetHeight, 1, 100);
    // this.camera.position.set(10, 150, 150);
    // 设置相机的位置（x轴, y轴, z轴）
    this.camera.position.set(0, 50, 100);
    // 将相机指向场景中心
    this.camera.lookAt(this.scene.position);
  }

  // 初始化灯光
  initLight() {
    // 平行光 
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // const helper = new THREE.DirectionalLightHelper(directionalLight, 5 );
    // this.scene.add(helper);
    this.scene.add(directionalLight);
    // // 环境光
    const ambientLight = new THREE.AmbientLight(0x2b2b2b);
    this.scene.add(ambientLight);
    // 点光源
    const pointLight = new THREE.PointLight(0xffffff, 1, 0);
    pointLight.position.set(500, 500, 500);
    this.scene.add(pointLight);
  }

  initAxesHelper() {
    // 辅助三维坐标系
    const axesHelper = new THREE.AxesHelper(30);
    this.scene.add(axesHelper);
  }

  // 初始化控制器
  initControls() {
    // 初始化控制器,创建控件对象
    const controls = new TrackballControls(this.camera, this.renderer.domElement);
    // 是否禁用缩放
    controls.noZoom = false;
    // 是否禁用平移
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.target.set(0, 0, 0);
    // controls.target = new THREE.Vector3(2, 44, 32);
    this.controls = controls;
  }

  // 初始化渲染
  initRenderer() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    // 创建渲染器对象
    this.renderer = new THREE.WebGLRenderer({
      // 是否执行抗锯齿
      antialias: true,
      // 开启背景透明
      alpha: true
    });
    // 设置渲染器的初始颜色（十六进制颜色, 透明度）
    // this.renderer.setClearColor(0x333333, 1);
    // 为了兼容高清屏幕
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染器大小（标签宽度, 标签高度）, 改成这样就可以居中
    this.renderer.setSize(width, height);
    // 将渲染器添加到渲染容器中
    this.canvas.appendChild(this.renderer.domElement);
  }

  // 加载管理器
  // loadingManager = new THREE.LoadingManager(
  //   onProgress(url, num, total) => {

  //   }
  // )

  // 循环渲染
  renderThree = () => {
    requestAnimationFrame(this.renderThree);
    this.controls.update(); // 轨道控制器的更新
    this.renderer.clear(); // 清除画布
    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize() {
    this.camera.aspect = this.canvas.offsetWidth / this.canvas.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight);
  }

  windowResize() {
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // 声明一个方法传入参数可以在不同的地方调用相机
  cameraReset(cameraPosition: any, lookAtPosition: any, time = 5) {
    gsap.to(this.camera.position, {
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z,
      duration: time,
      ease: 'power4.out'
      // onComplete: function () {
      // 这是相机运动完成的回调,可以执行其他的方法.
      // }
    });
    gsap.to(this.camera.lookAt, {
      x: lookAtPosition.x,
      y: lookAtPosition.y,
      z: lookAtPosition.z,
      duration: time,
      ease: 'power4.out'
      // onComplete: function () {
      // 这是相机运动完成的回调,可以执行其他的方法.
      // }
    });
  }

  // 加载模型
  objLoadModel(modelPath: string) {
    const objLoader = new OBJLoader();
    objLoader.load(
      modelPath,
      (obj: any) => {
        // console.log(obj);
        // obj.traverse((item: any) => {
        //   console.log(item);
        //   if (item instanceof THREE.Mesh) {
        //     item.material = new THREE.MeshBasicMaterial({color: '0x0f0f'});
        //   }
        // });
        // 将 OBJ 模型添加到场景中
        this.scene.add(obj);
        // 设置 OBJ 模型居中
        obj.children[0].geometry.center();
                
        // 设置 OBJ 模型缩放大小
        // obj.children[0].scale.set(100, 100, 100);
      },
      (xhr: any) => {
        // 控制台查看加载进度xhr
        // console.log(Math.floor((xhr.loaded / xhr.total) * 100));
      },
      (error: any) => {
        // 加载出错
        console.log(error);
      }
    );
  }

  // 加载模型
  gltfLoadModel(modelPath: string) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      modelPath,
      (gltf: any) => {
        const loadscene = gltf.scene;
        // //  投影
        // loadscene.castShadow = true;
        // // 设置大小比例
        // loadscene.scale.set(30, 30, 30);
        // const wrapper = new THREE.Object3D();
        // //模型在场景中的为准, x:左右，y:高低，x：上下
        // wrapper.position.set(0, 150, 0);
        // wrapper.add(loadscene);
        // wrapper.rotation.set(0, Math.PI / 2, 0);
        // this.scene.add(wrapper);
        this.scene.add(loadscene);
      },
      (xhr: any) => {
        // 控制台查看加载进度xhr
        // console.log(Math.floor((xhr.loaded / xhr.total) * 100));
      },
      (error: any) => {
        // 加载出错
        console.log(error);
      }
    );
  }

  // 加载天空盒
  loadSky(skyPath: string) {
    // 背景
    this.scene.background = new THREE.TextureLoader().setPath(skyPath).load(['background.jpg']);
    // 盒子第一种方式
    // let path = skyPath;
    // let format = '.jpg';
    // let directions = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
    // // 设置盒子材质
    // let materialArray = [];
    // for (let i = 0; i < 6; i++)
    //   materialArray.push(
    //     new THREE.MeshBasicMaterial({
    //       map: THREE.ImageUtils.loadTexture(path + directions[i] + format), // 将图片纹理贴上
    //       side: THREE.BackSide // 镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的一片，因为你身处在盒子的内部，所以一定要设置镜像翻转
    //     })
    //   );
    // let skyMaterial = new THREE.MeshFaceMaterial(materialArray);
    // let skybox = new THREE.Mesh(new THREE.BoxGeometry(800, 300, 300), skyMaterial);
    // this.scene.add(skybox);
    // 第二种方式
    // const textureCube = new THREE.CubeTextureLoader()
    //   .setPath(skyPath)
    //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
    // this.scene.background = textureCube;
    // this.renderer.setClearAlpha(1);
  }

  // 加载环境贴图
  loadHdr() {
    // 使用hdr作为背景色
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    // 阴影
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load('/public/model/skyImages/railway_bridge_02_4k.hdr', (texture: any) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      // 给场景添加环境光效果
      this.scene.environment = envMap;
      // 给场景添加背景图
      // this.scene.background = envMap；
      pmremGenerator.dispose();
    });
  }
}
