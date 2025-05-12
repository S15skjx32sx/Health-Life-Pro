public with sharing class SubscriptionController {
    @AuraEnabled
    public static void createSubscription(Map<String, Object> sub) {
        try {
            Subscription_c newSub = new Subscription_c();
            newSub.Name = (String) sub.get('name');
            newSub.Subscription_Name__c = (String) sub.get('subscriptionName');
            newSub.Membership_Start_Date__c = Date.valueOf((String) sub.get('membershipstartDate'));
            newSub.Membership_End_Date__c = Date.valueOf((String) sub.get('membershipendDate'));
            newSub.Subscription_Type__c = (String) sub.get('subscriptionType');
            Object amtObj = sub.get('amount');
            if (amtObj != null) {
                newSub.Amount__c = Decimal.valueOf(amtObj.toString());
            }

            insert newSub;
        } catch (Exception e) {
            throw new AuraHandledException('Error saving subscription: ' + e.getMessage());
        }
    }
}