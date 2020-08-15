/**
 * Preloader controller.
 * 
 * @author Konrad Fedorczyk <konrad.fedorczyk@realhe.ro>
 * @version 1.0.0
 */
export default class Preloader {
  /**
   * Create preloader controller.
   * @param {Node} el Main preloader wrapper.
   * @param {boolean} controlBody Should we add -loading modifier to body tag?
   * @param {boolean} visible Is preloader already visible?
   */
  constructor(el, controlBody = true, visible = true) {
    this.preloader = el;
    this.visible = visible;
    this.body = null;

    // If this is main preloader we also control body tag.
    if(controlBody) {
      this.body = document.getElementsByTagName('body')[0];
    }
  }

  /**
   * State change handler.
   */
  toggleVisibilityState() {
    if(!this.visible) {
      this.preloader.classList.remove('-active', '-hide');
      this.preloader.setAttribute('aria-busy', false);

      if(this.body) {
        this.body.classList.remove('-loading');
      }
    } 
  }

  /**
   * Show preloader.
   * 
   * @returns {Promise} Resolved when preloader is fully shown.
   */
  showPreloader() {
    return new Promise((resolve) => {
      // On transition end.
      this.preloader.addEventListener('transitionend', () => {
        this.preloader.removeEventListener('transitionend', this.toggleVisibilityState);
        this.toggleVisibilityState();
        resolve('visible');
      });

      this.visible = true;
      this.preloader.classList.remove('-hide');
      this.preloader.classList.add('-active');
      this.preloader.setAttribute('aria-busy', true);

      // With this hack we do not need to use setTimeout on animation class.
      getComputedStyle(this.preloader).transitionDuration;
      this.preloader.classList.add('-show');

      if(this.body) {
        this.body.classList.add('-loading');
      }
    });
  }

  /**
   * Hide Preloader.
   * 
   * @returns {Promise} Resolved when preloader is fully hidden.
   */
  hidePreloader() {
    return new Promise((resolve) => {
      // On transition end.
      this.preloader.addEventListener('transitionend', () => {
        this.preloader.removeEventListener('transitionend', this.toggleVisibilityState);
        this.toggleVisibilityState();
        resolve('hidden');
      });

      this.visible = false;
      this.preloader.classList.remove('-show');
      this.preloader.classList.add('-hide');
    });
  }
}
