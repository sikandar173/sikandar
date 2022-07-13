public class TriggerAccount {
    public static void triggerMethod(List<contact> listNew){
        set<id>s=new set<id>();
        if(listNew!=null){
            for(contact c:listNew){
                if(c.AccountId!=null){
                    s.add(c.AccountId);
                }
            }
        }
        
        list<Account>accounts=[select id,countNum__c,(select id from Contacts) from Account where id in:s];
            if(!accounts.isEmpty()){
                for(Account acc:accounts){
                    acc.countNum__c=acc.contacts.size();
                }
       
                
            }
       
  
         update accounts;
    }
   
        

}
    

    

