import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GymSubscription extends LightningElement {
    isPlanSelected = false;
    selectedPlan = '';
    name = '';
    subscriptionName = '';
    startDate = '';
    endDate = '';
    subscriptionType = '';
    amount = '';

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
            amount: this.amount
        };

        console.log('Subscription Data:', subscriptionData);

        // Simulating async operation (replace with real Apex call)
        new Promise((resolve) => setTimeout(resolve, 500))
            .then(() => {
                this.showToast('Success', 'Submitted successfully!', 'success');
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
        this.amount = '';
        this.selectedPlan = '';
        this.isPlanSelected = false;
        this.planVariantPro = 'neutral';
        this.planVariantPlus = 'neutral';
        this.planVariantMax = 'neutral';
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
}
