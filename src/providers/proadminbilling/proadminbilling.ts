import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface inaddvendor {
  getAllBookingData: string;
  getBookingData:string;
    getPrintData:string;
    getPrintDataPrintWise:string;
}
@Injectable()
export class ProadminbillingProvider {
data: any;
printData:any;
  constructor(public http: HttpClient) {
     this.data = null;
    this.printData = null;
  }

getAllBookingData() {   
    this.data = null;     
if (this.data) {
    return Promise.resolve(this.data);
}      
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/TableBooking/getAllBookingData',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.getAllBookingData;
    resolve(this.data);
  }, (err) =>  {
  });
});
}


getAllBookingKitchenData() {   
    this.data = null;     
if (this.data) {
    return Promise.resolve(this.data);
}          
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/TableBooking/getAllBookingKitechenData',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.getAllBookingData;
    resolve(this.data);
  }, (err) =>  {
  });
});
}

getBookingPrintData(userId) {
 this.printData= null;
if (this.printData) {
    return Promise.resolve(this.printData);   
}            
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
tableBookingData: userId,                                             
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminBillingPrint/printDataShow',JSON.stringify(data), {
    headers: headersNew     
  })  
  .subscribe(res =>  { 
    this.printData = res.getPrintDataPrintWise; 
    console.log(this.printData);
    resolve(this.printData);
  }, (err) =>  {
  });
});
}


}
