import { LightningElement } from 'lwc';
import Image_Url from '@salesforce/resourceUrl/portfolio';
import Description from '@salesforce/schema/Account.Description';
export default class ProjectSection extends LightningElement {

    projectImage = Image_Url +'//portfolio/project2.png';

    projectData=[
        {
            id:1,
            Name:'Health Life Pro',
            Description:' Developed Health Life Pro, a responsive and user-centric web application on the Salesforce platform aimed at managing health and fitness subscription plans.Designed and developed a custom Enquiry Form using LWC and Apex to capture user subscription interests and store data in Salesforce objects, Integrated dynamic components for subscription plan selection, user input validation, and real-time form updates.Deployed the application via Experience Cloud, customizing the theme and branding to align with the client’s health product.',
            Technology:'Salesforce, Apex, LWC, JavaScript, Experience Cloud',
            Website:'https://elgoss-d-dev-ed.develop.my.site.com/'
        }
    ]
}