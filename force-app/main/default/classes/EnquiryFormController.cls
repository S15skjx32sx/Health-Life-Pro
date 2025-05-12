public with sharing class EnquiryFormController {
    @AuraEnabled
    public static void saveEnquiry(String fullname, String email, String phone, String message, 
                                String preferredContactTime, String enquiryType, String status, 
                                String responseDate, Boolean sendRegLink) {
        try {
            Enquiry__c enquiry = new Enquiry__c();
            enquiry.Full_Name__c = fullname;
            enquiry.Email__c = email;
            enquiry.Phone__c = phone;
            enquiry.Message__c = message;

            // ✅ Fix: Add 4th parameter (milliseconds = 0)
            if (String.isNotBlank(preferredContactTime)) {
                List<String> timeParts = preferredContactTime.split(':');
                if (timeParts.size() == 3) {
                    Integer hour = Integer.valueOf(timeParts[0]);
                    Integer minute = Integer.valueOf(timeParts[1]);
                    Integer second = Integer.valueOf(timeParts[2]);
                    enquiry.Preferred_Contact_Time__c = Time.newInstance(hour, minute, second, 0);
                }
            }

            enquiry.Enquiry_Type__c = enquiryType;
            enquiry.Status__c = status;

            if (String.isNotBlank(responseDate)) {
                enquiry.Response_Date__c = Date.valueOf(responseDate); // Format: yyyy-MM-dd
            }

            enquiry.Send_Registraion_Link__c = sendRegLink;

            insert enquiry;
        } catch (Exception e) {
            throw new AuraHandledException('Error while saving enquiry: ' + e.getMessage());
        }
    }
}