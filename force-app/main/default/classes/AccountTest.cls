@isTest
public class AccountTest {
    
    @isTest
    //method to test insertion 
    
    public static void testInsert(){
        //Create an account object
        Account acc=new Account(Name='test');
        insert acc;
        
        List<contact> con=new List<contact>();
        for(Integer i=0;i<5;i++){
            con.add(new contact(lastName='jhon'+i,AccountId=acc.Id));
        }
        insert con;
        //to verify contact size usig assertion
        System.assertEquals(5,con.Size());
        
    }   
    @isTest
    //method to test when contact is 5 delete previous four
    public static void testDeleteWhenContactIsGreaterThanFive(){
        Account acc2=new Account(Name='test2');
        insert acc2;
        //Adding  six contacts to verify 
        contact con=new contact(lastName='jhon',AccountId=acc2.Id);
        insert con;
        contact con1=new contact(lastName='jhon1',AccountId=acc2.Id);
        insert con1;
        contact con2=new contact(lastName='jhon2',AccountId=acc2.Id);
        insert con2;
        contact con3=new contact(lastName='jhon3',AccountId=acc2.Id);
        insert con3;
        contact con4=new contact(lastName='jhon4',AccountId=acc2.Id);
        insert con4;
        contact con5=new contact(lastName='jhon5',AccountId=acc2.Id);
        insert con5;
        //count method is used to count the number of contact
        Integer countCon=[select count() from contact];
        System.assertEquals(2,countCon,'may be some error');
    }
}