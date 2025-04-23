import { LightningElement, track } from 'lwc';

export default class Navbar extends LightningElement { 
    @track showProfile = false;
    @track isMenuOpen = false;

    // Toggle for nav menu (hamburger)
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    // Toggle user profile dropdown
    toggleProfile() {
        this.showProfile = !this.showProfile;
    }

    // Close the dropdown when user clicks update
    handleUpdate() {
        alert('Update clicked');
        this.showProfile = false;
    }

    // Dynamic class for nav menu
    get navMenuClass() {
        return this.isMenuOpen ? 'nav-links active' : 'nav-links';
    }
}