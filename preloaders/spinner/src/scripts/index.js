import '../styles/index.scss';
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
document.addEventListener("DOMContentLoaded", (event) => { 
  MainPreloader.hidePreloader().then(log);
}); 

// Test show & hide.
setInterval(() => {
  MainPreloader.showPreloader().then(log);

  setTimeout(() => MainPreloader.hidePreloader().then(log), 2000);
}, 4000);
