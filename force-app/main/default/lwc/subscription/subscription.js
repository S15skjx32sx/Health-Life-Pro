import { LightningElement, track } from 'lwc';
import createSubscription from '@salesforce/apex/SubscriptionController.createSubscription';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GymSubscription extends LightningElement {
    @track isPlanSelected = false;
    @track selectedPlan = '';
    @track name = '';
    @track subscriptionName = '';
    @track membershipstartDate = '';
    @track membershipendDate = '';
    @track subscriptionType = '';
    @track amount = null;

    planVariantPro = 'neutral';
    planVariantPlus = 'neutral';
    planVariantMax = 'neutral';

    subscriptionTypeOptions = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Yearly', value: 'Yearly' }
    ];

    handlePlanSelection(event) {
        this.selectedPlan = event.target.dataset.plan;
        this.isPlanSelected = true;

        this.planVariantPro = this.selectedPlan === 'Pro' ? 'brand' : 'neutral';
        this.planVariantPlus = this.selectedPlan === 'Pro Plus' ? 'brand' : 'neutral';
        this.planVariantMax = this.selectedPlan === 'Pro Max' ? 'brand' : 'neutral';

        if (this.selectedPlan === 'Pro') {
            this.subscriptionName = 'Pro';
            this.amount = 12000;
        } else if (this.selectedPlan === 'Pro Plus') {
            this.subscriptionName = 'Pro Plus';
            this.amount = 25000;
        } else if (this.selectedPlan === 'Pro Max') {
            this.subscriptionName = 'Pro Max';
            this.amount = 42000;
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();

        const subscriptionData = {
            plan: this.selectedPlan,
            name: this.name,
            subscriptionName: this.subscriptionName,
            membershipstartDate: this.membershipstartDate,
            membershipendDate: this.membershipendDate,
            subscriptionType: this.subscriptionType,
            amount: parseFloat(this.amount)
        };

        createSubscription({ sub: subscriptionData })
            .then(() => {
                this.showToast('Success', 'Subscription successfully created!', 'success');
                this.clearForm();
            })
            .catch((error) => {
                let errorMessage = 'Unknown error';
                if (error?.body?.message) {
                    errorMessage = error.body.message;
                } else if (error?.message) {
                    errorMessage = error.message;
                }
                this.showToast('Error', errorMessage, 'error');
            });
    }

    clearForm() {
        this.name = '';
        this.subscriptionName = '';
        this.membershipstartDate = '';
        this.membershipendDate = '';
        this.subscriptionType = '';
        this.amount = null;
        this.selectedPlan = '';
        this.isPlanSelected = false;
        this.planVariantPro = 'neutral';
        this.planVariantPlus = 'neutral';
        this.planVariantMax = 'neutral';

        const inputs = this.template.querySelectorAll('lightning-input, lightning-combobox');
        inputs.forEach(input => {
            input.value = '';
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}