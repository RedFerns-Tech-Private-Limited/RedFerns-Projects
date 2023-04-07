import { LightningElement, wire } from 'lwc';
import userStoryList from '@salesforce/apex/userStoryList.listViewNames';
import { NavigationMixin } from 'lightning/navigation';

const columns = [
    { label: 'Ticket Number', fieldName: 'ticketLink', type: 'url', 
        typeAttributes: {label: {fieldName:'Name'}}},
    { label: 'Subject', fieldName: 'Subject__c' },
    //{ label: 'Description', fieldName: 'Description__c', type: 'html'},
    { label: 'Status', fieldName: 'Status__c'},
];
export default class ListRecords extends NavigationMixin(LightningElement) {
    error;
    columns = columns;
    availableUserStory;
    inputValue='All';
    searchText='';

    @wire(userStoryList,{ filterBy: '$inputValue',searchText: '$searchText'})
    userStory( {error,data} ){

        if(data){
            let userStoryLists = [];
            data.forEach( (record) => {
                let userStoryList = Object.assign( {},record);
                userStoryList.ticketLink='/' + userStoryList.Id;
                userStoryLists.push(userStoryList);
            });
            this.availableUserStory=userStoryLists;
            this.error=undefined;
        }else if(error){
            this.error=error;
            this.availableUserStory=undefined;
        }
        
    }
    
    get picklistValues(){
        return [
                { label: 'All' , value: 'All' },
                { label: 'Not Started' , value: 'Not Started' },
                { label: 'In Progress (Pre-Deploy)' , value: 'In Progress (Pre-Deploy)' },
                { label: 'In Progress (Post-Deploy)' , value: 'In Progress (Post-Deploy)' },
                { label: 'Pending Reply - Internal' , value: 'Pending Reply - Internal' },
                { label: 'Pending Reply - External' , value: 'Pending Reply - External' },
                { label: 'Ready for Deployment' , value: 'Ready for Deployment' },
                { label: 'Deployed to Production' , value: 'Deployed to Production' },
                { label: 'Completed' , value: 'Completed' },
                { label: 'On Hold' , value: 'On Hold' },              
                { label: 'Backlog' , value: 'Backlog' },
                { label: 'Cancelled' , value: 'Cancelled' },                
                
        ];
    }
    handlechange(event){
        this.inputValue=event.detail.value;
    }
    handleSearchOnchange(event){
        this.searchText=event.detail.value;
    }
    handleOnClick(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'User_Story__c',
                actionName: 'new'
            }
        });
    }
}