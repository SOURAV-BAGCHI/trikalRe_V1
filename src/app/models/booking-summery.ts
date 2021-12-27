import { StatusRecord } from './status-record';
import { RoomOrderBasics } from './room-order-basics';

export interface BookingSummery {
    bookingId:string;
    name:string;
    phone:string;
    email:string;
    createDate:string;
    bookingStartDate:string;
    bookingEndDate:string;
    statusList:StatusRecord[];
    status:number;
    checkin:string;
    checkout:string;
    roomOrderDetails:RoomOrderBasics[];
    numberOfDays:number;
}
