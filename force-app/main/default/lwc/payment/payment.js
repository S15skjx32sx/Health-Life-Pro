import { LightningElement, track } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/payment';
import savePayment from '@salesforce/apex/PaymentController.savePayment';
import getCurrentMemberId from '@salesforce/apex/PaymentController.getCurrentMemberId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PaymentPage extends LightningElement {
    visa = Image_Url + '/payment/visa.png';
    mastercard = Image_Url + '/payment/mastercard.png';
    amex = Image_Url + '/payment/amex.png';
    discover = Image_Url + '/payment/discover.png';

    @track selectedMethod = 'card';
    @track cardNumber = '';
    @track expiry = '';
    @track cvv = '';
    @track email = '';
    @track amount = '';
    @track notes = '';

    // --------------------- UI Classes ---------------------
    get getCardMethodClass() {
        return this.selectedMethod === 'card' ? 'method active' : 'method';
    }

    get getBankMethodClass() {
        return this.selectedMethod === 'bank' ? 'method active' : 'method';
    }

    get getPayMethodClass() {
        return this.selectedMethod === 'pay' ? 'method active' : 'method';
    }

    get isCardSelected() {
        return this.selectedMethod === 'card';
    }

    get isBankSelected() {
        return this.selectedMethod === 'bank';
    }

    get isPaySelected() {
        return this.selectedMethod === 'pay';
    }

    // --------------------- Event Handlers ---------------------
    selectMethod(event) {
        this.selectedMethod = event.currentTarget.dataset.method;
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this[name] = value;
    }

    // --------------------- Submit Handler ---------------------
    async handleSubmit(event) {
    event.preventDefault();

    const { cardNumber, expiry, cvv, email, amount, notes } = this;

    // Trim and sanitize input values
    const trimmedCardNumber = cardNumber?.trim();
    const trimmedExpiry = expiry?.trim();
    const trimmedCVV = cvv?.trim();
    const trimmedEmail = email?.trim();
    const trimmedAmount = amount?.toString().trim();
    const trimmedNotes = notes?.trim();
console.log("date:",trimmedExpiry)
    // Validations
    if (!/^\d{16,19}$/.test(trimmedCardNumber)) {
        console.log("'Invalid Card', 'Enter a valid 16–19 digit card number', 'error'");
        this.showToast('Invalid Card', 'Enter a valid 16–19 digit card number', 'error');
        return;
    }
    
    console.log('Entered Expiry Value:', trimmedExpiry);

// Regular Expression: MM/YY format where MM is 01 to 12
const regex = /^\d{4}-(0[1-9]|1[0-2])$/;

if (regex.test(trimmedExpiry)) {
    console.log("Valid format");
} else {
    console.log("Invalid format");
}


    // if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmedExpiry)) {
    //     //console.log("'Invalid Expiry', 'Enter expiry in MM/YY format (01-12/YY)', 'error'");
    //     this.showToast('Invalid Expiry', 'Enter expiry in MM/YY format (01-12/YY)', 'error');
    //     return;
    // }

    if (!/^\d{3,4}$/.test(trimmedCVV)) {
        console.log("'Invalid CVV', 'Enter a valid 3 or 4 digit CVV', 'error'");
        this.showToast('Invalid CVV', 'Enter a valid 3 or 4 digit CVV', 'error');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        console.log("'Invalid Email', 'Enter a valid email address', 'error'");
        this.showToast('Invalid Email', 'Enter a valid email address', 'error');
        return;
    }

    if (!trimmedAmount || isNaN(trimmedAmount) || parseFloat(trimmedAmount) <= 0) {
        console.log("'Invalid Amount', 'Enter a valid amount greater than 0', 'error'");
        this.showToast('Invalid Amount', 'Enter a valid amount greater than 0', 'error');
        return;
    }

    console.log("Form data: ", trimmedCardNumber, trimmedExpiry, trimmedCVV, trimmedEmail, trimmedAmount, trimmedNotes);

    try {
        const memberId = await getCurrentMemberId();

        if (!memberId) {
            this.showToast('Member Not Found', '❌ Member not found for current user.', 'error');
            return;
        }

        let paymentMethod = 'Credit Card';
        if (this.selectedMethod === 'bank') paymentMethod = 'Net Banking';
        else if (this.selectedMethod === 'pay') paymentMethod = 'UPI';

        const result = await savePayment(
            parseFloat(trimmedAmount),
            paymentMethod,
            trimmedNotes,
            memberId,
            null,
            trimmedExpiry
        );

        this.showToast('Success', `✅ Payment saved successfully. Payment ID: ${result}`, 'success');
        this.resetForm();

    } catch (error) {
        console.error('Error in handleSubmit:', error);
        this.showToast('Error', '⚠ Error while saving payment.', 'error');
    }
}


    // --------------------- Form Reset ---------------------
    resetForm() {
        this.cardNumber = '';
        this.expiry = '';
        this.cvv = '';
        this.email = '';
        this.amount = '';
        this.notes = '';
    }

    // --------------------- Toast Utility ---------------------
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
                mode: 'dismissable'
            })
        );
    }

    // --------------------- Alternate Payment Handlers ---------------------
    submitInternetBanking() {
        this.showToast('Redirecting', 'Redirecting to Internet Banking Page...', 'info');
    }

    submitPay() {
        this.showToast('Pay Initiated', 'Apple/Google Pay initiated...', 'info');
    }
}
