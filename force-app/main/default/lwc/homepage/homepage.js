import { LightningElement } from 'lwc';

export default class HealthlifeproHomepage extends LightningElement {
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