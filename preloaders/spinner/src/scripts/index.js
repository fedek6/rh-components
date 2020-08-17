import '../styles/index.scss';

// import(/* webpackPreload: true */ "../components/molecules/preloader/preloader.scss");
import Preloader from "../components/molecules/preloader/preloader";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// Preload object for controlling preloader behaviour.
const MainPreloader = new Preloader(document.getElementById('main-preloader'), true, true);

// Dummy logger
const logs = document.getElementById("log");

function log(txt) {
  let logEntry = document.createElement("li");
  logEntry.textContent = `Last preloader event: ${txt}`;
  logs.appendChild(logEntry);
}

// Hide preloader on content loaded.
window.addEventListener('load', () => {
  MainPreloader.hidePreloader().then(log);
});
