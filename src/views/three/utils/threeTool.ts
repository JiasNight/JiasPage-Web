import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
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
  }

  // 初始化场景
  initThree() {
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initRenderer();
    this.initControls();
    this.windowResize();
  }

  // 初始化场景
  initScene() {
    this.scene = new THREE.Scene();
  }

  // 初始化相机
  initCamera() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;
    // 相机设置
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // this.camera.position.set(10, 150, 150);
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(this.scene.position);
  }

  // 初始化灯光
  initLight() {
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xdfebff, 0.45);
    directionalLight.position.set(2000, 2000, 1000).normalize();
    this.scene.add(directionalLight);
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x999999);
    this.scene.add(ambientLight);
    // 点光源
    const light = new THREE.PointLight(0xffffff);
    light.position.set(0, 500, 1000);
    this.scene.add(light);
  }

  initHelper() {
    // 辅助三维坐标系
    const axesHelper = new THREE.AxesHelper(500);
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
    // 为了兼容高清屏幕
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 改成这样就可以居中
    this.renderer.setSize(width, height);
    this.canvas.appendChild(this.renderer.domElement);
    // this.renderer.setClearColor('#1e1e1e');
  }

  // 循环渲染
  renderThree = () => {
    requestAnimationFrame(this.renderThree);
    this.controls.update(); // 轨道控制器的更新
    this.renderer.clear(); // 清除画布
    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  windowResize() {
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // 声明一个方法传入参数可以在不同的地方调用相机
  cameraReset(position: any, lookAt: any, time = 1) {
    gsap.to(this.camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: time,
      ease: 'power4.out'
      // onComplete: function () {
      // 这是相机运动完成的回调,可以执行其他的方法.
      // }
    });
    gsap.to(this.camera.lookAt, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration: time,
      ease: 'power4.out'
    });
    gsap.to(this.camera.target, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration: time,
      ease: 'power4.out'
    });
  }

  // 加载模型
  loadModel(modelPath: string, modelName: string) {
    const gltfLoader = new GLTFLoader();
    gltfLoader.setPath(modelPath);
    gltfLoader.load(
      modelName,
      (gltf: any) => {
        const loadscene = gltf.scene;
        //  投影
        loadscene.castShadow = true;
        // 设置大小比例
        loadscene.scale.set(90, 80, 80);
        const wrapper = new THREE.Object3D();
        //模型在场景中的为准, x:左右，y:高低，x：上下
        wrapper.position.set(320, 0, 200);
        wrapper.add(loadscene);
        wrapper.rotation.set(0, Math.PI / 2, 0);
        this.scene.add(wrapper);
      },
      (xhr: any) => {
        // 控制台查看加载进度xhr
        console.log(Math.floor((xhr.loaded / xhr.total) * 100));
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
