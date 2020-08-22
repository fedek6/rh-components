import {
  DoubleSide, 
  Color, 
  Fog, 
  MeshStandardMaterial, 
  Matrix4, 
  InstancedMesh, 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  PointLight, 
  BoxGeometry,
  MeshNormalMaterial, 
  Mesh, 
  Box3, 
  Vector3, 
  Euler, 
  Quaternion
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


/* import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; */

export let api = {
  count: 120,
  rotationYSpeed: 0.01,
  rotationZSpeed: 0.01,
  cameraZPosition: 8
};

/** Class for rendering 3D matrix */
export class Bg3DMatrix {
  /**
   * Create 3D background.
   * @param {*} options
   */
  constructor({downgradeResolution = false, api = api} = {}) {
    this.downgradeResolution = downgradeResolution;
    this.api = api;
    this.animating = false;

    this.init();
    this.initObjects();
  }

  /**
   * Init app.
   */
  init() {
    this.createScene();

    //this.cube = this.createCube();
    // this.scene.add(this.cube);
    var fogColor = new Color(0xdedede);
    this.scene.fog =  new Fog(fogColor, 0.025, 18);
    // If you want to set bg color.
    // this.scene.background = new Color( 0xFFFFFF );
    this.camera.position.z = this.api.cameraZPosition;
  }

  /**
   * Init scene objets and animate.
   */
  initObjects() {
    this.createGltf().then((result) => {
      this.model = result;
      // const material = new MeshNormalMaterial();


      const material = new MeshStandardMaterial({
        color: 0x2b2b2b, 
        side: DoubleSide,
        emissive: 0x777777,
        opacity: 1
      }); 

			var matrix = new Matrix4();
			this.mesh = new InstancedMesh( this.model.geometry, material, this.api.count );      

			for ( var i = 0; i < this.api.count; i ++ ) {
				this.randomizeMatrix( matrix );
				this.mesh.setMatrixAt( i, matrix );
			}

      this.scene.add(this.mesh  );
    }).then(() => {
      if (!this.animating) {
        this.animating = true;
        this.animate();
      }
    });
  }

  /**
   * Clean scene.
   */
  cleanObjects() {
    let meshes = [];

    this.scene.traverse(object => {
      if (object.isMesh) meshes.push(object);
    });

    meshes.forEach(mesh => {
      mesh.material.dispose();
      mesh.geometry.dispose();
      this.scene.remove( mesh );
    });
  }

  reset() {
    this.camera.position.z = this.api.cameraZPosition;
    this.cleanObjects();
    this.initObjects();
  }

  /**
   * Prepare scene.
   */
  createScene() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setClearColor( 0xffffff, 0);

    // var light = new AmbientLight( 0x404040, 2 ); // soft white light
    // this.scene.add( light );

    var light = new PointLight( 0xffffff, 1.3, 100 );
    light.position.set( 0, 0, 20 );
    this.scene.add( light );

    // If we need to downgrade resolution fo perfomance reasons.
    this.resize();

    document
      .getElementById('bg-3d-container')
      .appendChild( this.renderer.domElement );
  }

  /**
   * Resize.
   */
  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // If we need to downgrade resolution fo perfomance reasons.
    if(this.downgradeResolution) {
      width /= 2; 
      height /= 2;
    } 

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Main animate method (update).
   */
  animate() {
    requestAnimationFrame( () => this.animate() );

    // Animatiom bit
    this.mesh.rotation.y += this.api.rotationYSpeed;
    this.mesh.rotation.z += this.api.rotationZSpeed;

    this.renderer.render( this.scene, this.camera );
  }

  /**
   * Dummy green test cube.
   */
  createCube() {
    const geometry = new BoxGeometry();
    // const material = new MeshBasicMaterial( { color: 0x00ff00 } );

    const material = new MeshNormalMaterial();
    const cube = new Mesh( geometry, material );
    
    return cube;
  }

  /**
   * Load gltf
   */
  createGltf() {
    const gltfLoader = new GLTFLoader();
    
    return new Promise(  (resolve, reject) => {
      gltfLoader.load('public/models/disney/model.gltf', (gltf) => {
        const material = new MeshNormalMaterial();


        /* var lambertWhiteMaterial = new MeshStandardMaterial({
          color: 0x6e6e6e, 
          side: DoubleSide,
          emissive: 0x777777,
          opacity: 1
        }); */

        const object = gltf.scene;
 

        //object.scale.x = 0.001;
        //object.scale.y = 0.001;
        //object.scale.z = 0.001;


        //object.scale.x = 100;
        //object.scale.y = 100;
        // object.scale.z = 100;

        const box = new Box3().setFromObject( object );
        const center = box.getCenter( new Vector3() );

        object.position.x += ( object.position.x - center.x );
        object.position.y += ( object.position.y - center.y );
        object.position.z += ( object.position.z - center.z );

        //let extract = object.getObjectByName( "Rock_02_LOD0" );

        let extract = object.getObjectByName( "DisneyHead_lores_Disney_lores" );
        
        // let extract = object.scene;

        extract.material = material;

        //extract.scale.x = 0.001;
        //extract.scale.y = 0.001;
        // extract.scale.z = 0.001;

        //extract.scale.x = 2005456735413211322360;
        //extract.scale.y = 200543545340;
        //extract.scale.z = 2000;


        /* object.traverse((o) => {
          console.log(o);
          if (o.isMesh) o.material = material;
        }); */

        resolve(extract);
      });
    });
  }

  randomizeMatrix(matrix) {

    var position = new Vector3();
    var rotation = new Euler();
    var quaternion = new Quaternion();
    var scale = new Vector3();

    const spreadMin = 5;
    const spreadMax = 10;

    const sizeMin = 0.001;
    const sizeMax = 0.012;

    position.x = Math.random() * spreadMax - spreadMin;
    position.y = Math.random() * spreadMax - spreadMin;
    position.z = Math.random() * spreadMax - spreadMin;

    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler( rotation );

    // scale.x = scale.y = scale.z = Math.random() * 1;
    scale.x = scale.y = scale.z = (Math.random() * (sizeMax - sizeMin) + sizeMin);

    matrix.compose( position, quaternion, scale );
  }
}