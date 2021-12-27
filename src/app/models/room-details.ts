export interface RoomDetails {
    roomId:number;
    name:string;
    ratePerDay:number;
    isSelected:boolean;
    isACAvailable:boolean;
    isAvailingAc:boolean;
    acCharges:number;
    discount:number;
    numberOfPersons:number;
    maxNoOfPersons:number;
    features:string[];
    imageList:string[];
    imageNameList:string[];
}
