import '../styles/index.scss';
import Pace from "pace";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');

Pace.start();
