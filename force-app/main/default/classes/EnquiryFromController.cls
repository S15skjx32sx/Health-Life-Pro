public with sharing class EnquiryFormController {
    @AuraEnabled
    public static void saveEnquiry(String name, String email, String phone, String message, string status, string enquirytype) {
        try {
            Enquiry__c enquiry = new Enquiry__c();
            enquiry.Name__c = name;
            enquiry.Email__c = email;
            enquiry.Phone__c = phone;
            enquiry.Message__c = message;
            enquiry.Status__c = status;
            enquiry.Enquiry_Type__c = enquirytype;
            insert enquiry;
        } catch (Exception e) {
            throw new AuraHandledException('Error while saving enquiry: ' + e.getMessage());
        }
    }
}

        