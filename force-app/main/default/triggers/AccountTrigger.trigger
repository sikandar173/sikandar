trigger AccountTrigger on Account (Before insert, After insert) {
    if(Trigger.isAfter && Trigger.isInsert){
        List<contact> conList=new List<contact>();
        for(Account accRec:Trigger.new){
            contact con=new contact();
            con.LastName=accRec.Name;
            con.AccountId=accRec.Id;
            conList.add(con);
        }
        if(conList.size()>0)
            Insert conList;
            
    }
    
    
    
    
    //before trigger
    if(Trigger.isBefore && Trigger.isInsert){
        for(Account accRec:Trigger.new){
            if(accRec.AnnualRevenue<1000)
                accRec.addError('annual revenue is less tha 1000');
            
            
            
            if(accRec.ShippingCity==null)
                accRec.ShippingCity=accRec.BillingCity;
            if(accRec.ShippingCountry==null)
                accRec.ShippingCountry=  accRec.BillingCountry;
            if(accRec.ShippingState==null)
                accRec.ShippingState=accRec.BillingState;
            if(accRec.ShippingStreet==null)
                accRec.ShippingStreet=accRec.BillingStreet;
            if(accRec.ShippingPostalCode==null)
                accRec.ShippingPostalCode=accRec.BillingPostalCode;
        }
    }
}