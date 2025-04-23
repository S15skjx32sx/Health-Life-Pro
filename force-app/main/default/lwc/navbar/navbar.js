import { LightningElement, track } from 'lwc';

export default class Navbar extends LightningElement { 
  @track isMenuOpen = false;

    // Method to toggle nav menu
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
    // Dynamic class assignment based on toggle state
    get navMenuClass() {
      return this.isMenuOpen ? 'nav-links active' : 'nav-links';
    }
}