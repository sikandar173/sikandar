trigger TriggerB on Contact (after insert,after delete,after update,after undelete) {
    
    if(trigger.isAfter){
        if(trigger.isInsert||trigger.isUpdate||trigger.isUndelete){
            Account_Handler.triggerCall(Trigger.new);
        }
        
        if(trigger.isDelete){ 
            Account_Handler.deleteTriggerCall(Trigger.old);
        }
        
    }
}