import { LightningElement, track } from 'lwc';

export default class HealthlifeproHomepage extends LightningElement {
  @track isMenuOpen = false;
  scrollAmount = 0;
  intervalId;

  // Toggle Menu on Click
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  get navClass() {
    return this.isMenuOpen ? 'nav-links active' : 'nav-links';
  }

  renderedCallback() {
    // Prevent multiple intervals on re-render
    if (this.intervalId) return;

    const serviceContainer = this.template.querySelector('.services-container');
    if (serviceContainer) {
      this.intervalId = setInterval(() => {
        if (this.scrollAmount < serviceContainer.scrollWidth - serviceContainer.clientWidth) {
          this.scrollAmount += 1;
          serviceContainer.scrollTo(this.scrollAmount, 0);
        } else {
          this.scrollAmount = 0;
          serviceContainer.scrollTo(0, 0);
        }
      }, 30);
    }
  }

  disconnectedCallback() {
    // Clear the interval when component is destroyed
    clearInterval(this.intervalId);
  }
}
