({
    doinit: function(component,event,helper) {
       var action =component.get("c.getKeyRecord");
       //console.log('----action======',action);
      action.setParams({recid:component.get('v.recordId')});
      action.setCallback(this,function(respone) {
      component.set('v.conlist', respone.getReturnValue());
       });
      $A.enqueueAction(action);
    },
    editTalent : function(component, event, helper) {
        var index = event.target.dataset.index;
        console.log('@@@@@@',index);
        var thisObjId = event.target.dataset.sfid;
        console.log('============thisObjId',thisObjId)
        var thisId = event.target.id;
        console.log('--------',thisId);
        var conlist = component.get( "v.conlist" );        
        component.set('v.recSelectId',thisId);
        for ( var i = 0; i < conlist.length; i++ ) {
            if(conlist[i].editMode == true){
                var eventToast = $A.get("e.force:showToast");
                eventToast.setParams({
                    "title":'Error',
                    "type":'error',
                    "message":'You can edit only one record at a time.'
                });
                eventToast.fire();
                return false;
            }
            conlist[i].editMode = false;
        }
        conlist[index].editMode = true;
        component.set( "v.conlist", conlist );        
    
    },
    deleteRowId : function(component,event,helper) {
        var sfid = event.target.dataset.sfid;
       console.log('@@@@@@Sfid',sfid);
        var action = component.get("c.deleteAccount");
      console.log('-------action',action);
        action.setParams({AccountId:sfid});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS'){
                var result = response.getReturnValue();
              console.log('========delet status',result);
                var accountList = component.get( "v.conlist" );
               component.set("v.conlist",accountList);
               helper.refreshView(component);
               //alert('record deleted successfully');                
               var eventToast = $A.get("e.force:showToast");
               eventToast.setParams({
                   "title":'Success',
                   "type":'success',
                   "message":'Record deleted successfully.'
                  });
                eventToast.fire();
           }
        });
        $A.enqueueAction(action);
      
 }
     

})   