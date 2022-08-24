({
    doinit: function(component) {
       var action = component.get('c.getAccountData');
       var self = this;
       action.setParams({recid:component.get('v.recordId')});
      action.setCallback(this, function(actionResult) {
      
     component.set('v.Acclist', actionResult.getReturnValue());
       });
      $A.enqueueAction(action);
    },
    edit : function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            recordId : event.target.id
        });
        editRecordEvent.fire();
    },
    delete : function(component, event) {
        var action = component.get("c.deleteAccount");
        action.setParams({AccountId:event.target.id});
        action.setCallback(this, function(response) {
         component.set("v.Acclist",response.getReturnValue());
        });
        $A.enqueueAction(action);
 }
     

})   