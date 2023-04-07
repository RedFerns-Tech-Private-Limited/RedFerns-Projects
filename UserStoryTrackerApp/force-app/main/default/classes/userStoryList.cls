public class userStoryList {
    @auraEnabled(cacheable=true)
    public static list<User_Story__c> listViewNames(string filterBy,string searchText){
        string searchFor='%'+searchText+'%';
        if(filterBy=='All'){
            return [SELECT id, Name,Status__c, Subject__c, start_date__c, description__c FROM User_Story__c 
                    WHERE (status__c='Not Started' OR 
                           status__c='In Progress (Pre-Deploy)' OR 
                           status__c='In Progress (Post-Deploy)' OR
                           status__c='Pending Reply - Internal' OR 
                           status__c='Pending Reply - External' OR 
                           status__c='Ready for Deployment' OR 
                           status__c='Deployed to Production' OR 
                           status__c='Completed'OR
                           status__c='On Hold' OR 
                           status__c='Backlog' OR 
                           status__c='Cancelled')AND
                    Subject__c Like:searchFor ORDER BY Name DESC];
        }else{
            return [SELECT id, Name,Status__c, Subject__c, start_date__c, description__c 
                    FROM User_Story__c WHERE status__c Like:filterBy AND Subject__c Like:searchFor ORDER BY Name DESC];
        }        
    }
    
}