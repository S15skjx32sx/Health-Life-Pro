import { LightningElement } from 'lwc';
import sendTrainerEmail from '@salesforce/apex/AppointmentEmailController.sendTrainerEmail';
import nutritionGuidance from '@salesforce/resourceUrl/Nutrition_Guidance';
import professionalTrainers from '@salesforce/resourceUrl/Professional_Trainers';
import morningHabits from '@salesforce/resourceUrl/Morning_Habits';
import buildCoreStrength from '@salesforce/resourceUrl/Build_Core_Strength';
import highProteinDie from '@salesforce/resourceUrl/High_Protein_Die';
import modernEquipment from '@salesforce/resourceUrl/Modern_Equipment';
import gymBg from '@salesforce/resourceUrl/gym_bg';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import BOOTSTRAP from '@salesforce/resourceUrl/bootstrap';


export default class HealthlifeproHomepage extends LightningElement {
  backgroundStyle = `background: url(${gymBg}) center/cover no-repeat;`;

    nutritionGuidance = nutritionGuidance;
    professionalTrainers = professionalTrainers;
    morningHabits = morningHabits;
    buildCoreStrength = buildCoreStrength;
    highProteinDie = highProteinDie;
    modernEquipment = modernEquipment;
    gymBg = gymBg;
    
  renderedCallback() {    
    Promise.all([
      loadStyle(this, BOOTSTRAP + '/bootstrap.min.css'),
      loadScript(this, BOOTSTRAP + '/bootstrap.bundle.min.js')
  ])
  .then(() => {
      console.log('Bootstrap loaded successfully');
  })
  .catch(error => {
      console.error('Error loading Bootstrap:', error);
  });    
    // Prevent multiple intervals on re-render
    if (this.intervalId) return;

    const serviceContainer = this.template.querySelector('.services-container');
    if (serviceContainer) {
      this.intervalId = setInterval(() => {
        if (this.scrollAmount < serviceContainer.scrollWidth - serviceContainer.clientWidth) {
          this.scrollAmount += 1;
          serviceContainer.scrollTo(this.scrollAmount, 0);
        } else {
          this.scrollAmount = 0;
          serviceContainer.scrollTo(0, 0);
        }
      }, 30);
    }
  }

  disconnectedCallback() {
    // Clear the interval when component is destroyed
    clearInterval(this.intervalId);
  }

  handleSubmit(event) {
    event.preventDefault();
    const userName = this.template.querySelector('#name').value;
    const trainerOption = this.template.querySelector('#trainer').value;
    const appointmentDate = this.template.querySelector('#appointment-date').value;
    const appointmentTime = this.template.querySelector('#appointment-time').value;

    // Trainer Email Mapping (Replace with real trainer emails)
    const trainerEmails = {
        trainer1: 'trainer1@example.com',
        trainer2: 'trainer2@example.com',
        trainer3: 'trainer3@example.com'
    };

    const trainerEmail = trainerEmails[trainerOption];

    sendTrainerEmail({ trainerEmail, userName, appointmentDate, appointmentTime })
        .then(() => {
            alert('Appointment booked successfully and email sent to the trainer!');
        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('Something went wrong while sending the email.');
            });
}
}