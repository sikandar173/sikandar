trigger TriggerB on Contact (Before insert,after insert,after delete,after update,after undelete) {
    
    if(trigger.isAfter){
        if(trigger.isInsert||trigger.isUpdate||trigger.isUndelete){
            Account_Handler.triggerCall(Trigger.new);
        }
        
        if(trigger.isDelete||trigger.isUpdate){ 
            Account_Handler.deleteTriggerCall(Trigger.old);
        }
        
    }
    if(trigger.isBefore){
        if(trigger.isInsert){
            Account_Handler.insertTriggerCall(Trigger.new);
        }
    }
}