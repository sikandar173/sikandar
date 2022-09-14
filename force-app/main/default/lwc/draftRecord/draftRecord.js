import { LightningElement, track, wire} from 'lwc';
import insertDraft from '@salesforce/apex/DraftHandler.insertDraft';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import returnDraft from '@salesforce/apex/DraftHandler.returnDraft';
import insertTask from '@salesforce/apex/DraftHandler.insertTask';
import deleteDraft from '@salesforce/apex/DraftHandler.deleteDraft';
import checkdraft from '@salesforce/apex/DraftHandler.checkdraft';
export default class DraftRecord extends LightningElement {
   @track showModel=false;
   @track cancelModel=false;
   returndata;
   subject;
   activityDate;
   newAction;
   dealPartner;
   data;
   countDown;
   inputVal=[];
   comment;

  
   openModel(){

    this.showModel=true;
    this.countDown = setInterval(() => {
      let obj={
         subject : this.subject,
         newAction : this.newAction,
         dealPartner : this.dealPartner,
         activityDate : this.activityDate,
         comment:this.comment
      };
      console.log('insert value in draft',JSON.stringify(obj));
      if(obj.subject || obj.newAction|| obj.dealPartner ||obj.activityDate)
      { 
      insertDraft({draftData:JSON.stringify(obj)})
      .then(result=>{
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Toast Success',
            message: 'draft insert sucessful',
            variant: 'success',
            mode: 'dismissable'
         })
      );
         this.data = result;
         console.log('return Data:'+ JSON.stringify(this.data));
   })
   .catch(error=>{
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Not Success',
            message: 'Error',
            variant: 'danger'
         }),
      );
      this.message = "Error"
      this.error = error;
      console.log('error occured',error);
      console.log('error occured',JSON.stringify(error));

   });
}else{
//console.log("please enter at least one input field");
}
},10000);
 }


   hideModal()
   {
      // this.cancelModel=true;
      this.showModel=false;
      clearInterval(this.countDown);
      this.data = result;
     }

connectedCallback(){
   // this.showModel=true;
   returnDraft()
   .then(result=>{ 
       console.log('result of connected call back',JSON.parse(result))
    this.data=JSON.parse(result)
      if(this.data!=null){
         this.showModel=true; 
     
      this.returndata=JSON.parse(result);
      console.log('returndata========',this.returndata);
      this.subject=this.returndata.subject;
      this.activityDate=this.returndata.activityDate;
      this.newAction=this.returndata.newAction;
      this.dealPartner=this.returndata.dealPartner;
      this.comment=this.comment;
     } 
   })
   .catch(error=>
   {
      this.message=undefined;
      this.error=error;
   });
}
   

   handleChange(event) {
        this.comment = event.target.value;
        console.log("comment",this.comment);
   }
   subjectInput(event){
      this.subject = event.target.value;
      console.log("Subject",this.subject);  
   }
   activityInput(event){
      this.activityDate=event.target.value;
      console.log("activityDate",this.activityDate);
   }
   actionInput(event){
      this.newAction=event.target.value;
      console.log('newAction',this.newAction)
   }
   dealInput(event){
       this.dealPartner=event.target.value;
       console.log('dealInput',this.dealPartner);
      }
      
   
      saveModel(){
      clearInterval(this.countDown);
      if(this.isInputValid()) {
         
      let obj={
         subject : this.subject,
         newAction : this.newAction,
         dealPartner : this.dealPartner,
         activityDate : this.activityDate,
         comment : this.comment
      };
      console.log('insert value in task',JSON.stringify(obj));
      insertTask({taskData:JSON.stringify(obj)})
     .then(result=>{
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Toast Success',
            message: 'task insert sucessful',
            variant: 'success',
            mode: 'dismissable'
            
         })
        
      );
      this.showModel=false;
      this.cancelDraft();
      this.subject=null;
      this.newAction=null;
      this.dealPartner=null;
      this.activityDate=null;
      this.comment=null;
      //clearInterval(this.countDown);
      
     
         this.data = result;
         console.log('return  task Data:'+ JSON.stringify(this.data));
   })
   .catch(error=>{
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Not Success',
            message: 'Error',
            variant: 'danger'
         }),
      );
      this.message = "Error"
      this.error = error;
      console.log('error occured',error);
      console.log('error occured',JSON.stringify(error));


   });

}

      let sub = this.template.querySelector(`[data-name="subject"]`);
      console.log("====Subject====",sub.value);
      console.log("====Subject====",this.subject);
      let actdate=this.template.querySelector(`[date-name="activityDate"]`);
      console.log("============activitydate",actdate.value);
      console.log('==========activity date=====',this.activityDate);
      let newAct=this.template.querySelector(`[date-name="newAction"]`);
      console.log("============activitydate",newAct.value);
      console.log('==========activity date=====',this.newAction);
      let dealPar=this.template.querySelector(`[date-name="dealPartner"]`);
      console.log("============activitydate",dealPar.value);
      console.log('==========activity date=====',this.dealPartner);

   }
   isInputValid() {
      let isValid = true;
      let inputFields = this.template.querySelectorAll('.validate');
      inputFields.forEach(inputField => {
          if(!inputField.checkValidity()) {
              inputField.reportValidity();
              isValid = false;
          }
        //  this.task[inputField.Subject] = inputField.value;
      });
      return isValid;
  }

  cancelDelete(){
   this.cancelModel=false;
   this.showModel=true;
    this.returnDraft();
  }

  cancelDraft(){
  // this.cancelModel=true;
   clearInterval(this.countDown);
   deleteDraft()
   .then(result=>{
     this.data=result;
     console.log('data going to be delete',this.data);
      this.cancelModel=false;
      this.showModel=false;
      this.subject=null;
      this.newAction=null;
      this.dealPartner=null;
      this.activityDate=null;
      this.comment=null;
         //this.data = result;
        // console.log('return Data:'+ JSON.stringify(this.data));
   })
   .catch(error=>{
      this.dispatchEvent(
         new ShowToastEvent({
            title: 'Not Success',
            message: 'Error',
            variant: 'danger'
               })
            );
   this.message = "Error"
   this.error = error;
   console.log('error occured',error);
   console.log('error occured',JSON.stringify(error));
}); 
  }
  checkModal(){
   checkdraft()
   .then(result=>{
     
      if(result){
         this.cancelModel=true;
      }
     
   })
  .catch(error=>{
     console.log('may be error',error);
     this.showModel=false;
     clearInterval(this.countDown);
     this.subject=null;
        this.newAction=null;
        this.dealPartner=null;
        this.activityDate=null;
        this.comment=null;
  });
 
  }


}
   