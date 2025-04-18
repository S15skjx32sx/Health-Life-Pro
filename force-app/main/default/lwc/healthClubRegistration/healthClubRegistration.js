import { LightningElement } from 'lwc';
import Fitness1 from '@salesforce/resourceUrl/Fitness1';
import Reg from '@salesforce/resourceUrl/Reg';
import GooglePay from '@salesforce/resourceUrl/GooglePay';

export default class HealthClubRegistration extends LightningElement {
    bannerImage = Fitness1;
    registerIcon = Reg;
    payIcon = GooglePay;

    errorMessage = '';

    handleSubmit(event) {
        event.preventDefault();

        const form = this.template.querySelector('form');
        const inputs = form.querySelectorAll('input, select');

        let data = {};
        let isValid = true;

        inputs.forEach((field) => {
            const name = field.name;
            const value = field.value.trim();

            data[name] = value;

            if (field.hasAttribute('required') && value === '') {
                isValid = false;
            }
        });

        // Basic validations
        if (!isValid) {
            this.errorMessage = 'Please fill in all required fields.';
            alert(this.errorMessage);
            return;
        }

        // Email validation
        if (!this.isValidEmail(data['Email__c'])) {
            this.errorMessage = 'Please enter a valid email address.';
            alert(this.errorMessage);
            return;
        }

        // Phone validation
        if (!this.isValidPhone(data['Phone__c'])) {
            this.errorMessage = 'Please enter a valid 10-digit phone number.';
            alert(this.errorMessage);
            return;
        }

        // All validations passed
        this.errorMessage = '';
        console.log('✅ Form Data Submitted:', JSON.stringify(data));
        alert('Form submitted successfully!');

        // TODO: Call Apex method here if needed
    }

    // Email pattern check
    isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Phone pattern check
    isValidPhone(phone) {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone);
    }
}
