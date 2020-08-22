// Modules
import { Bg3DMatrix, api } from './Bg3DMatrix';

// Assets
import '../styles/index.scss';

console.log(api);

let controlApi = Object.assign({}, api, { count: 10 });

const bgRenderer = new Bg3DMatrix({downgradeResolution: false, api: controlApi});

setTimeout(() => {
  controlApi.count = 20;
  // bgRenderer.cleanObjects();
  // bgRenderer.initObjects();
}, 5000);

setInterval(() => {
  controlApi.rotationYSpeed += 0.0000001;
  controlApi.rotationZSpeed += 0.0000001;
  controlApi.count += 1;
  controlApi.cameraZPosition += 1;
  bgRenderer.reset();
}, 2000); 


window.addEventListener( 'resize', () => bgRenderer.resize(), false );
