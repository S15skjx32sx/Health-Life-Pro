import { LightningElement, wire } from 'lwc';
import getLoggedInMemberProfile from '@salesforce/apex/MemberProfileController.getLoggedInMemberProfile';

export default class ProfilePage extends LightningElement {
    profileData = {};
    showMoreDetails = false;

    @wire(getLoggedInMemberProfile)
    wiredProfileData({ error, data }) {
        if (data) {
            this.profileData = data;
        } else if (error) {
            console.error('Error fetching profile data:', error);
        }
    }

    get formattedProfile() {
        return {
            Name: this.profileData.Name || 'Not Available',
            Full_Name: this.profileData.Full_Name__c || 'Not Available',
            Phone: this.profileData.Phone__c || 'Not Available',
            Email: this.profileData.Email__c || 'Not Available',
            Address: this.profileData.Address__c || 'Not Available',
            Gender: this.profileData.Gender__c || 'Not Available',
            Date_of_Birth: this.profileData.Date_of_Birth__c || 'Not Available',
            Start_Date: this.profileData.Start_Date__c || 'Not Available',
            End_Date: this.profileData.End_Date__c || 'Not Available',
            Membership_Status: this.profileData.Membership_Status__c || 'Not Available',
            Membership_Plan: this.profileData.Membership_Plan__c || 'Not Available',
            Subscription: this.profileData.Subscription__c || 'Not Available',
            Fitness_Trainer: this.profileData.Fitness_Trainer__c || 'Not Available',
            Fitness_Classes: this.profileData.Fitness_Classes__c || 'Not Available',
            Diet_chart: this.profileData.Diet_chart__c || 'Not Available',
            Related_Gym_Location: this.profileData.Related_Gym_Location__c || 'Not Available',
            Enquiry: this.profileData.Enquiry__c || 'Not Available',
            Payment: this.profileData.Payment__c || 'Not Available',
            rofile_Image_URL: this.profileData.Profile_Image_URL__c || 'https://via.placeholder.com/150'
        };
    }

    toggleDetails() {
        this.showMoreDetails = !this.showMoreDetails;
    }
}
