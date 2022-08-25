({
	doinit : function(component, event, helper) {
		var action=component.get("c.getCon");
        action.setCallback(this,function(response) {
            component.set('v.conlist', response.getReturnValue());
       });
      $A.enqueueAction(action);
    },
    openCreateModel:function(component, event, helper) {
        component.set("v.openModel",true);
    },
    closeCreateModel:function(component, event, helper){
       component.set("v.openModel",false); 
    },
    editContact:function(component, event, helper){
         component.set("v.openModel",true);
        var conId=event.currentTarget.dataset.conid;
        component.set("v.contId",conId)
        var action=component.get("c.getRecordById");
        action.setParams({'Id':conId});
         action.setCallback(this,function(response) {
             component.set("v.getContact",response.getReturnValue());
             // alert(response.getState());
       });
      $A.enqueueAction(action);
          
    },
    saveModel:function(component, event, helper){
        
        var name=component.find("name").get("v.value");
        var email=component.find("email").get("v.value");
        var phone=component.find("phone").get("v.value");
        var cId=component.get("v.contId");
        var action=component.get("c.getEditContact");
        action.setParams({'conName':name, 'conEmail':email, 'conPhone':phone, 'conId':cId});
         action.setCallback(this,function(response) 
                            {
                  
              alert(JSON.stringify(response.getReturnValue()));
       });
      $A.enqueueAction(action);
    },
	
})