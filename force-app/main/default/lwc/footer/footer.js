import { LightningElement } from 'lwc';

export default class Footer extends LightningElement {
    handleSubscribe(event) {
        event.preventDefault();
        const emailInput = this.template.querySelector('input[type="email"]');
        const email = emailInput.value;
    
        // Here you could add integration logic or simply reset the form
        console.log(`Subscribed email: ${email}`);
        emailInput.value = '';
        alert('Thank you for subscribing!');
    }
}