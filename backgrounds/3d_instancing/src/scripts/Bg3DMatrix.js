import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/** Class for rendering 3D matrix */
export default class {
  /**
   * Create 3D background.
   * @param {*} options
   */
  constructor({downgradeResolution = false } = {}) {
    this.downgradeResolution = downgradeResolution;

    this.init();
  }

  /**
   * Init app.
   */
  init() {
    this.createScene();

    //this.cube = this.createCube();
    // this.scene.add(this.cube);
    var fogColor = new THREE.Color(0xdedede);
    this.scene.fog =  new THREE.Fog(fogColor, 0.025, 18);

    let promise = this.createGltf().then((result) => {
      this.model = result;
      // const material = new THREE.MeshNormalMaterial();


      const material = new THREE.MeshStandardMaterial({
        color: 0x2b2b2b, 
        side: THREE.DoubleSide,
        emissive: 0x777777,
        opacity: 1
      }); 

			var matrix = new THREE.Matrix4();
			this.mesh = new THREE.InstancedMesh( this.model.geometry, material, 120 );      

			for ( var i = 0; i < 120; i ++ ) {
				this.randomizeMatrix( matrix );
				this.mesh.setMatrixAt( i, matrix );
			}

      this.scene.add(this.mesh  );
    }).then(() => {
      this.animate();
    });

    // If you want to set bg color.
    // this.scene.background = new THREE.Color( 0xFFFFFF );

    this.camera.position.z = 8;
  }

  /**
   * Prepare scene.
   */
  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor( 0xffffff, 0);

    // var light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
    // this.scene.add( light );

    var light = new THREE.PointLight( 0xffffff, 1.3, 100 );
    light.position.set( 0, 0, 20 );
    this.scene.add( light );

    // If we need to downgrade resolution fo perfomance reasons.
    if(this.downgradeResolution) {
      this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    } else {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    document
      .getElementById('bg-3d-container')
      .appendChild( this.renderer.domElement );
  }

  /**
   * Main animate method (update).
   */
  animate() {
    requestAnimationFrame( () => this.animate() );

    // Animatiom bit
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.01;

    this.renderer.render( this.scene, this.camera );
  }

  /**
   * Dummy green test cube.
   */
  createCube() {
    const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh( geometry, material );
    
    return cube;
  }

  /**
   * Load gltf
   */
  createGltf() {
    const gltfLoader = new GLTFLoader();
    
    return new Promise(  (resolve, reject) => {
      gltfLoader.load('public/models/disney/model.gltf', (gltf) => {
        const material = new THREE.MeshNormalMaterial();


        var lambertWhiteMaterial = new THREE.MeshStandardMaterial({
          color: 0x6e6e6e, 
          side: THREE.DoubleSide,
          emissive: 0x777777,
          opacity: 1
        });

        const object = gltf.scene;
 

        //object.scale.x = 0.001;
        //object.scale.y = 0.001;
        //object.scale.z = 0.001;


        //object.scale.x = 100;
        //object.scale.y = 100;
        // object.scale.z = 100;

        const box = new THREE.Box3().setFromObject( object );
        const center = box.getCenter( new THREE.Vector3() );

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

    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();

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