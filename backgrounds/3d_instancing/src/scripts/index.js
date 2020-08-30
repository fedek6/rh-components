// Modules
import { Bg3DMatrix, api } from './Bg3DMatrix';

// Assets
import '../styles/index.scss';

console.log(api);

let controlApi = Object.assign({}, api, { count: 40, cameraZPosition: 8});

const bgRenderer = new Bg3DMatrix({downgradeResolution: false, api: controlApi});


setTimeout(() => {


    controlApi.cameraZPosition = 1;

  // bgRenderer.cleanObjects();
  // bgRenderer.initObjects();
}, 1000);


/* setTimeout(() => {
  controlApi.cameraZPosition = 0;
}, 1000); */

setTimeout(() => {
  controlApi.cameraZPosition = 26;
}, 5000);

/* setInterval(() => {
  controlApi.rotationYSpeed += 0.0000001;
  controlApi.rotationZSpeed += 0.0000001;
  controlApi.count += 1;
  controlApi.cameraZPosition += 1;
  bgRenderer.reset();
}, 2000); */


window.addEventListener( 'resize', () => bgRenderer.resize(), false );
