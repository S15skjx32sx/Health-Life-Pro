import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/portfolio';

export default class Portfolio extends LightningElement {
    heroimage = Image_Url + '/portfolio/hero1.jpg';
    
    handleclick() {
        // Add your click handling logic here
        console.log("Experience button clicked!");
    }
}
