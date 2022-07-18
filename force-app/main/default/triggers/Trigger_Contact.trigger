trigger Trigger_Contact on Contact (before insert,after insert,after delete,after update) {
    
    if(trigger.isAfter){
        
        if(trigger.isInsert||trigger.isUpdate){
            Account_Handler.triggerOnInsert(Trigger.new);
        }
        
        if(trigger.isDelete||trigger.isUpdate){ 
            Account_Handler.triggerOnDelete(Trigger.old);
        }
        
    }
    if(trigger.isBefore){
        if(trigger.isInsert){
            Account_Handler.triggerOnBeforeInsert(Trigger.new);
        }
    }
    
    
    
    
    
    
    
    
}