public class Account_Handler {
    
    public Static list<Account> ManagingTriggers(list<contact>listnew){
            set<Id> setList=new set<Id>();
        if(listnew!=null){
            for(contact c:listnew)
            {
                setList.add(c.AccountId);
            }
            
        }
        list<Account>accounts=[select id,countNum__c,(select id from Contacts) from Account where id in:setList];
        
        return accounts;
    }
    
    
    
    //method for deleting contact when it goes greather than 5 
    
    
    public static void insertTriggerCall(List<contact> listnew){
        list<Account>accounts=ManagingTriggers(listnew);
        list<Contact> conVar=new list<Contact>();
        for(Account acc:accounts){
            if(acc.countNum__c>4){
                conVar.addAll(acc.Contacts); 
            }
            
        }
        Delete conVar;
        
    }
    
    //method for update contact count should be decreased
    
    public static void deleteTriggerCall(List<contact> listold){
         list<Account>accounts=ManagingTriggers(listold);
        list<Account> conVar=new list<Account>();
        
        for(Account acc:accounts){
            acc.countNum__c=acc.Contacts.size();
            conVar.add(acc);
        }
        update convar;
    }
    //method for counting contact 
    
    public static void triggerCall(List<contact> listnew){
        
       list<Account>accounts=ManagingTriggers(listnew);
        list<contact> conVar=new list<contact>();
        for(Account acc:accounts)
        {
            acc.countNum__c=acc.contacts.size();
            conVar.addAll(acc.contacts);
        }
        
        update accounts;
    }
}