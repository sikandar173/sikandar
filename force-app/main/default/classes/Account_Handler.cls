public class Account_Handler {
    
    
    public static void deleteTriggerCall(List<contact> listold){
        set<Id> setList=new set<Id>();
        if(listold!=null){
            for(contact c:listold)
            {
                setList.add(c.AccountId);
            }
            
        }
          list<Account>accounts=[select id,countNum__c,(select id from Contacts) from Account where id in:setList];
            list<Account> conVar=new list<Account>();
        
        for(Account acc:accounts){
            acc.countNum__c=acc.Contacts.size();
            conVar.add(acc);
        }
        update convar;
    }
        
        public static void triggerCall(List<contact> listnew){
            
            set<Id> s=new set<Id>();
            if(listnew!=null)
            { 
                for(contact c:listnew)
                {
                    s.add(c.AccountId);
                }
                
            }
            
            list<Account>accounts=[select id,countNum__c,(select id from Contacts) from Account where id in:s];
            list<contact> conVar=new list<contact>();
            
            if(!accounts.isEmpty())
            { 
                for(Account acc:accounts)
                {
                    
                    if(acc.contacts.size()>=5)
                    {
                        conVar.addAll(acc.contacts);
                        
                        acc.countNum__c=0;
                        
                    }  
                    
                    else 
                    { 
                        acc.countNum__c=acc.contacts.size();
                        
                    }
                    
                    
                    
                }
                
            } 
            if(conVar.size()>=5)
            {
                delete conVar;
                
            }
            
            update accounts;  
        }
    
}