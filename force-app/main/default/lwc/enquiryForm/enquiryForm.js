import { LightningElement, track } from 'lwc';
import saveEnquiry from '@salesforce/apex/EnquiryFormController.saveEnquiry';
import ApplicationImage from '@salesforce/resourceUrl/Application';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EnquiryForm extends LightningElement {
    appImage = ApplicationImage;

    @track fullname = '';
    @track email = '';
    @track phone = '';
    @track message = '';
    @track preferredContactTime = '';
    @track enquiryType = '';
    @track status = '';
    @track responseDate = '';
    @track trainerLookup = '';
    @track sendRegLink = false;

    enquiryTypeOptions = [
        { label: 'New', value: 'New' },
        { label: 'Membership', value: 'Membership' },
        { label: 'Diet Plan', value: 'Diet Plan' },
        { label: 'Trainer', value: 'Trainer' },
        { label: 'Exercise Routine', value: 'Exercise Routine' }
    ];

    messageStatusOptions = [
        { label: 'New', value: 'New' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Responded', value: 'Responded' },
        { label: 'Closed', value: 'Closed' }
    ];

    handleNameChange(event) {
        this.fullname = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handlePhoneChange(event) {
        this.phone = event.target.value;
    }
    handleMessageChange(event) {
        this.message = event.target.value;
    }
    handlePreferredContactTimeChange(event) {
        this.preferredContactTime = event.target.value;
    }
    handleEnquiryTypeChange(event) {
        this.enquiryType = event.detail.value;
    }
    handleStatusChange(event) {
        this.status = event.detail.value;
    }
    handleResponseDateChange(event) {
        this.responseDate = event.target.value;
    }
    handleTrainerLookupChange(event) {
        this.trainerLookup = event.target.value;
    }
    handleSendRegLinkChange(event) {
        this.sendRegLink = event.target.checked;
    }

    handleSubmit() {
        console.log("hello");
        console.log(this.fullname);
        console.log(this.email);
        console.log(this.phone);
        console.log(this.message);

        // event.preventDefault();
        saveEnquiry({
            fullname: this.fullname,
            email: this.email,
            phone: this.phone,
            message: this.message,
            preferredContactTime: this.preferredContactTime,
            enquiryType: this.enquiryType,
            status: this.status,
            responseDate: this.responseDate,
            trainer: this.trainerLookup,
            sendRegLink: this.sendRegLink
        })
        .then(() => {
            this.showToast('Success', 'Enquiry submitted successfully!', 'success');
            this.clearForm();
        })
        .catch(error => {
            let errorMessage = 'Unknown error';
            if (error.body && error.body.message) {
                errorMessage = error.body.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            this.showToast('Error', errorMessage, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    clearForm() {
        this.fullname = '';
        this.email = '';
        this.phone = '';
        this.message = '';
        this.preferredContactTime = '';
        this.enquiryType = '';
        this.status = '';
        this.responseDate = '';
        this.trainerLookup = '';
        this.sendRegLink = false;
    }
}
