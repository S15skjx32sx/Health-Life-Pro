import { LightningElement, wire } from 'lwc';
import getLoggedInMemberProfile from '@salesforce/apex/MemberProfileController.getLoggedInMemberProfile';

export default class ProfilePage extends LightningElement {
    member;
    error;
    avatarUrl = 'https://www.example.com/your-avatar-image.jpg';  // Customize your avatar URL

    // Fetch member profile data from Apex
    @wire(getLoggedInMemberProfile)
    wiredMember({ error, data }) {
        if (data) {
            this.member = data;
            this.error = undefined;
        } else if (error) {
            this.error = 'Failed to load member profile data: ' + error.body.message;
            this.member = undefined;
        }
    }

    // Getter methods for the fields with conditional logic

    get membershipPlan() {
        return this.member?.Membership_Plan__r ? this.member.Membership_Plan__r.Name : 'Not Available';
    }

    get subscription() {
        return this.member?.Subscription__r ? this.member.Subscription__r.Name : 'Not Available';
    }

    get fitnessTrainer() {
        return this.member?.Fitness_Trainer__r ? this.member.Fitness_Trainer__r.Name : 'Not Available';
    }

    get fitnessClasses() {
        return this.member?.Fitness_Classes__r ? this.member.Fitness_Classes__r.Name : 'Not Available';
    }

    get dietChart() {
        return this.member?.Diet_chart__r ? this.member.Diet_chart__r.Name : 'Not Available';
    }

    get gymLocation() {
        return this.member?.Related_Gym_Location__r ? this.member.Related_Gym_Location__r.Name : 'Not Available';
    }

    get enquiry() {
        return this.member?.Enquiry__r ? this.member.Enquiry__r.Name : 'Not Available';
    }

    get payment() {
        return this.member?.Payment__r ? this.member.Payment__r.Name : 'Not Available';
    }

    // Handle renewal button click
    handleRenewalClick() {
        // Handle renewal logic here
        alert('Renewal Clicked!');
    }
}
