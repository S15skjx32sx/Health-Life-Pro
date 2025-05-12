public with sharing class csvController {
    @AuraEnabled(cacheable=true)
    public static List<Demo_Data__c> fetchRecords(){
        return [SELECT FNAME__c, LNAME__c, CELL__c,SALUTATION__c, TITLE__c FROM Demo_Data__c];
    }
}