public class ApexForGetKeyContact {

    @AuraEnabled
    public static List<Contact> getCon(String recid){
        return[select Id,Name,Email,Phone from Contact where AccountId=:recid];
    }

    @AuraEnabled
    public static Contact getRecordById(String Id){
        return[select Id,Name,Email,Phone from Contact where Id=:Id];
    }

    @AuraEnabled
    public static void deleteConact(String Id){

        Contact conList=new Contact();
        conList.Id=Id;
        DELETE conList; 
    }

    @AuraEnabled
    public static boolean getEditContact(String conName,String conEmail,String conPhone,String conId){

        try{

            Contact con=new Contact();
            con.LastName=conName;
            con.Email=conEmail;
            con.Phone=conPhone;
            con.Id=conId;
            update con;
        }
        catch(DmlException e){
            
        }
        
        return true;
        
    }
       

}