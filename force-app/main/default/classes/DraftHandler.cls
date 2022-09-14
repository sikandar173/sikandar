public with sharing class DraftHandler {
    @AuraEnabled
   public static String insertDraft(String draftData){
    List<Draft__c> draftValue=[select Id,Subject__c from Draft__c];
    if(draftValue.isEmpty())
    { 
      Draft__c d=new Draft__c();
      d.Subject__c=draftData;
      INSERT d;
   return ''+d;
    }
    else
    {
      Draft__c du=[SELECT Id,Subject__c FROM Draft__c];
      du.Subject__c=draftData;
      UPDATE du ;
      return ''+du;
    }
   }
     @AuraEnabled
     public static string checkdraft(){
      Draft__c checkDraftRecord=[SELECT Id,Subject__c FROM Draft__c];
      return ''+checkDraftRecord;
     }
   @AuraEnabled
   public static string deleteDraft(){
    Draft__c dvalue=[SELECT Id ,Subject__c From Draft__c];
    DELETE dvalue;
    return null;
   }
  @AuraEnabled  
 public static String returnDraft(){
   Draft__c draftReturnValue=[SELECT Id, Subject__c from Draft__c limit 1];
   return ''+draftReturnValue.Subject__c;
 }


 @AuraEnabled
 public static string insertTask(String taskData){
  wrapper wrap=(wrapper)JSON.deserialize(taskData,wrapper.class);
   Task taskRecord=new Task();
   taskRecord.Subject=wrap.subject;
   taskRecord.ActivityDate=wrap.activityDate;
   taskRecord.Description=wrap.comment.stripHtmlTags();
   insert taskRecord;
   return taskRecord+'';
 }
  public class wrapper
 {
   public string subject {get;set;}
   public string newAction {get;set;}
   public date activityDate {get;set;}
   public string comment {get;set;}
   public string dealPartner {get;set;}
 }
}
