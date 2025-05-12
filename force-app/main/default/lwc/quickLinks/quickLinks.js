import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/portfolio';
import { NavigationMixin } from 'lightning/navigation';

export default class QuickLinks extends NavigationMixin(LightningElement) {
    data = [
        {
            id: 1,
            image: Image_Url + '/portfolio/experience.jpg',
            text: 'Experience',
        },
        {
            id: 2,
            image: Image_Url + '/portfolio/skill.jpg',
            text: 'Skill',
        },
        {
            id: 3,
            image: Image_Url + '/portfolio/project.png',
            text: 'Project',
        }
    ];

    handleClick(event) {
        let selectedCard = event.currentTarget.dataset.id;
        const cardId = parseInt(selectedCard, 10);

        if (cardId === 1) {
            this.navigateTopage('Experience__c'); // Correct page API name
        } else if (cardId === 2) {
            this.navigateTopage('skill__c');
        } else {
            this.navigateTopage('project__c');
        }
    }

    navigateTopage(pageApiName) {
        console.log('Navigation to: ' +pageApiName);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        });
    }


}
