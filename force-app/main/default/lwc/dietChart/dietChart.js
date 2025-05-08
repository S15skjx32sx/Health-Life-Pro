import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/diet';


export default class DietChart extends LightningElement {
    dietimage = Image_Url+'/diet/diet.png';
    oatsimage = Image_Url+'/diet/oats.jpeg';
    bananasimage = Image_Url+'/diet/bananas.jpg';
    WholeGainBreadimage = Image_Url+'/diet/grain.jpeg';
    proteinpowderimage = Image_Url+'/diet/proteinpowder.jpeg';
    peanutbutterimage = Image_Url+'/diet/peanutbutter.jpeg';
    chickenimage = Image_Url+'/diet/chicken.jpg';
}
