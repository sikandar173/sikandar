({
    refreshView : function(component,event,helper) {
        var action = component.get("c.getKeyRecord"); 
        console.log('helper action@@@@@@@@',action)
        action.setCallback(this, function(response){
            var state = response.getState();            
            if(state=='SUCCESS'){
                var result = response.getReturnValue(); 
                console.log('resukt%%%%%%%',result)              
                component.set('v.conlist',result);
            }
        });
        $A.enqueueAction(action);

    }
})
