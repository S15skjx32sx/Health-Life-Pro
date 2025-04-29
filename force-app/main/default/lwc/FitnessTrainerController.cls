public with sharing class FitnessTrainerController {

    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getTrainerData() {
        List<Fitness_Trainer__c> trainerList = [
            SELECT Id, Name, Email_Address__c, Phone_Number__c,
                   Assigned_Location__c, Certifications__c,
                   Years_of_Experience__c, Specialization__c,
                   Hourly_Rate__c, Bio__c, Working_Status__c,
                   Profile_Picture__c
            FROM Fitness_Trainer__c
        ];

        List<Map<String, Object>> results = new List<Map<String, Object>>();

        for (Fitness_Trainer__c trainer : trainerList) {
            Map<String, Object> trainerMap = new Map<String, Object>();
            trainerMap.put('trainer', trainer);

            // Construct downloadable image URL
            if (String.isNotBlank(trainer.Profile_Picture__c)) {
                trainerMap.put('imageUrl', '/sfc/servlet.shepherd/document/download/' + trainer.Profile_Picture__c);
            } else {
                trainerMap.put('imageUrl', '/resource/default_trainer_image'); // Optional fallback
            }

            results.add(trainerMap);
        }

        return results;
    }
}
