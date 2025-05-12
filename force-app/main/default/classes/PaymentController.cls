public with sharing class PaymentController {

@AuraEnabled
public static Id savePayment(
    Decimal paymentAmount,
    String paymentMethod,
    String notes,
    Id memberId,
    Id subscriptionId,
    String expiry
) {
    try {
        if (memberId == null) throw new CustomException('Member ID is required.');
        if (paymentAmount == null || paymentAmount <= 0) throw new CustomException('Payment amount must be greater than zero.');

        Date expiryDate;
        if (String.isNotBlank(expiry)) {
            try {
                expiryDate = Date.valueOf(expiry + '-01'); // Converts "2025-05" to "2025-05-01"
            } catch (Exception ex) {
                throw new CustomException('Invalid expiry format. Use YYYY-MM');
            }
        }

        Payment__c payment = new Payment__c();
        payment.Payment_Account__c = paymentAmount;
        payment.Invoice_Number__c = 'INV-' + DateTime.now().getTime();
        payment.Transaction_ID__c = 'TXN-' + DateTime.now().getTime();
        payment.Payment_Method__c = paymentMethod;
        payment.Notes__c = notes;
        payment.Member__c = memberId;
        payment.Subscription__c = subscriptionId;
        payment.Payment_Date__c = Date.today();
        payment.Payment_Status__c = 'Pending';
        payment.Expiry__c = expiry;

        insert payment;
        return payment.Id;

    } catch (Exception e) {
        System.debug('Error while saving payment: ' + e.getMessage());
        throw new CustomException('An error occurred while saving the payment: ' + e.getMessage());
    }
}


    @AuraEnabled
    public static Id getCurrentMemberId() {
        try {
            List<Member__c> memberList = [
                SELECT Id
                FROM Member__c
                WHERE CreatedById = :UserInfo.getUserId()
                ORDER BY CreatedDate DESC
                LIMIT 1
            ];
            if (!memberList.isEmpty()) {
                return memberList[0].Id;
            }
            return null;
        } catch (Exception e) {
            System.debug('Error while fetching member ID: ' + e.getMessage());
            throw new CustomException('An error occurred while fetching the member ID.');
        }
    }

    public class CustomException extends Exception {}
}

