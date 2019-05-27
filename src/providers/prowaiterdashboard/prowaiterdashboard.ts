import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



interface inaddvendor {
  getTableList: string;
getBookingData:string;
}
  
@Injectable()
export class ProwaiterdashboardProvider {
data: any;
bookingData:any;
  constructor(public http: HttpClient) {
     this.data = null;
this.bookingData = null;
  }

getTableListFree() {               
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AddTable/getAllTableListFree',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.getTableList;
    resolve(this.data);
  }, (err) =>  {
  });
});
}

getTableListBooking() {          
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AddTable/getAllTableListFreeBooking',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.getTableList;
    resolve(this.data);
  }, (err) =>  {
  });
});
}       

getTableList() {          
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AddTable/getAllTableList',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.getTableList;
    resolve(this.data);
  }, (err) =>  {
  });
});
}


   
getBookingData(userId) {
 this.bookingData = null;    
if (this.bookingData) {
    return Promise.resolve(this.bookingData);
}         
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
userId: userId,                                             
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/TableBooking/getUserWiseBookingData',JSON.stringify(data), {
    headers: headersNew     
  })  
  .subscribe(res =>  { 
    this.bookingData = res.getBookingData;  
    resolve(this.bookingData);
  }, (err) =>  {
  });
});
}

}
