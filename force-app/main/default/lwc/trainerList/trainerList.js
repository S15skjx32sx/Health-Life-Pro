import { LightningElement, track, wire } from 'lwc';
import getTrainerData from '@salesforce/apex/FitnessTrainerController.getTrainerData';
import TrainerImages from '@salesforce/resourceUrl/TrainerImages';

export default class TrainerList extends LightningElement {
    @track trainers = [];
    @track filteredTrainers = [];
    @track selectedSpecialization = 'Yoga';
    @track expandedTrainerId = null;

    @wire(getTrainerData)
    wiredTrainers({ error, data }) {
        if (data) {
            this.trainers = data;
            this.filterTrainers(this.selectedSpecialization);
        } else {
            console.error('Error fetching trainers:', error);
        }
    }
    get sidebarClass() {
        return this.showSidebar ? 'sidebar open' : 'sidebar';
    }
    toggleSidebar() {
        this.showSidebar = !this.showSidebar;
    }

    handleSpecializationClick(event) {
        this.selectedSpecialization = event.target.dataset.specialization;
        this.expandedTrainerId = null;
        this.filterTrainers(this.selectedSpecialization);
    }

    filterTrainers(specialization) {
        this.filteredTrainers = this.trainers
            .filter(t => t.trainer.Specialization__c === specialization)
            .map(t => ({
                ...t,
                isExpanded: t.trainer.Id === this.expandedTrainerId
            }));
    }

    handleTrainerClick(event) {
        const trainerId = event.currentTarget.dataset.id;
        this.expandedTrainerId = this.expandedTrainerId === trainerId ? null : trainerId;
       
        

        // Update the expanded flag again after click
        this.filteredTrainers = this.filteredTrainers.map(t => ({
            ...t,
            isExpanded: t.trainer.Id === this.expandedTrainerId
        }));
    }

    renderedCallback() {
        const all = this.template.querySelectorAll('li[data-specialization]');
        all.forEach(el => {
            el.classList.remove('selected');
            if (el.dataset.specialization === this.selectedSpecialization) {
                el.classList.add('selected');
            }
        });
    }
    @track selectedSpecialization = 'Yoga';
    getSidebarClass(specialization) {
        return specialization === this.selectedSpecialization ? 'active' : '';
    }
    toggleDetails(event) {
        const clickedId = event.currentTarget.dataset.id;
        this.expandedId = this.expandedId === clickedId ? null : clickedId;
    }
    
    getImageUrl(trainerName) {
        // Convert to lowercase and remove spaces for filename match
        const cleanName = trainerName.toLowerCase().replace(/\s+/g, '');
        return `${TrainerImages}/TrainerImages/${cleanName}.jpg`;
    }

    //get processedTrainers() {
      //  return this.filteredTrainers.map(item => {
        //    return {
        //        ...item,
        //        imageUrl: `${TrainerImages}/${name}.jpg`
         //   };
       // });
  
  //  }
}
