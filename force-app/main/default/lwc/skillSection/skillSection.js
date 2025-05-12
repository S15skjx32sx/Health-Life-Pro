import { LightningElement,api } from 'lwc';
import IMAGE_URL from '@salesforce/resourceUrl/portfolio';
export default class SkillSection extends LightningElement {
    @api skillName1 ;
    @api skillBarValue1 ;
    @api skillName2 ;
    @api skillBarValue2 ;
    @api skillName3 ;
    @api skillBarValue3 ;
    @api skillName4 ;
    @api skillBarValue4 ;
    @api skillName5 ;
    @api skillBarValue5 ;
    @api skillName6 ;
    @api skillBarValue6 ;
    

    skillImage = IMAGE_URL +'/portfolio/skill2.jpg';
}