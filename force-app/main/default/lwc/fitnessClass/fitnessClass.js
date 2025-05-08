import { LightningElement, track, wire } from 'lwc';
import getfitnessClassData from '@salesforce/apex/fitnessClassController.getfitnessClassData';

export default class FitnessClassDisplay extends LightningElement {
    @track allClasses = [];
    @track filteredClasses = [];
    @track selectedType = 'Yoga';
    @track isLoading = true;

    classTypes = ['Yoga', 'Pilates', 'Strength Training', 'Cardio', 'Zumba'];

    @wire(getfitnessClassData)
    wiredClasses({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.allClasses = data.map(cls => {
                const dateObj = new Date(cls.Schedule__c);
                const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
                const optionsTime = { hour: '2-digit', minute: '2-digit' };
                return {
                    ...cls,
                    formattedDate: dateObj.toLocaleDateString('en-US', optionsDate),
                    formattedTime: dateObj.toLocaleTimeString('en-US', optionsTime)
                };
            });
            this.filterClasses();
        } else if (error) {
            console.error('Error fetching classes', error);
        }
    }

    filterClasses() {
        this.filteredClasses = this.allClasses.filter(
            cls => cls.Class_Type__c === this.selectedType
        );
    }

    handleTypeClick(event) {
        this.selectedType = event.target.dataset.type;
        this.filterClasses();
    }

    get computedClassTypes() {
        return this.classTypes.map(type => ({
            type,
            class: type === this.selectedType ? 'sidebar-item active' : 'sidebar-item'
        }));
    }

    getFormattedDateTime(datetimeStr) {
        if (!datetimeStr) return { date: '', time: '' };
    
        const dateObj = new Date(datetimeStr);
        const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit' };
    
        const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
        const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime);
    
        return {
            date: formattedDate,
            time: formattedTime
        };
    }
    
}
