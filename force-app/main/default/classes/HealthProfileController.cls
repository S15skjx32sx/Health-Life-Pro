public with sharing class HealthProfileController {
    
    @AuraEnabled(cacheable=true)
    public static Member__c getCompleteProfile() {
        Id userId = UserInfo.getUserId();
        User u = [SELECT ContactId FROM User WHERE Id = :userId LIMIT 1];

        return [
            SELECT Name, Email__c, Phone__c,
                   Fitness_Trainer__r.Name, Fitness_Trainer__r.Email__c, Fitness_Trainer__r.Phone__c,
                   Subscription__r.Start_Date__c, Subscription__r.End_Date__c, Subscription__r.Status__c,
                   Subscription__r.Fitness_Class__r.Name, Subscription__r.Fitness_Class__r.Timings__c, Subscription__r.Fitness_Class__r.Days__c,
                   Diet_Chart__r.Plan_Name__c, Diet_Chart__r.Meals_Per_Day__c,
                   Survey_Plan__r.Plan_Name__c, Survey_Plan__r.Frequency__c
            FROM Member__c
            WHERE Contact__c = :u.ContactId
            LIMIT 1
        ];
    }
}
