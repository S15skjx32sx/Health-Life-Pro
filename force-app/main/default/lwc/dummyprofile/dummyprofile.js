import { LightningElement, wire } from 'lwc';
import getMemberDetails from '@salesforce/apex/MemberController.getMemberDetails';
import { CurrentPageReference } from 'lightning/navigation';
imp 

export default class Dummyprofile extends LightningElement {
    memberData;
    error;
    memberId = 'a09dL000009bHntQAE'; // Use dynamic ID based on context or pass from the URL

    @wire(getMemberDetails, { memberId: '$memberId' })
    wiredMember({ error, data }) {
        if (data) {
            this.memberData = data;  // Store fetched data in a variable
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.memberData = undefined;
        }
    }

    // You can also log the data to verify it's fetched properly
    connectedCallback() {
        console.log('Member Data:', this.memberData);
    }
}
