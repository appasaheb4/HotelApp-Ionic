import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface inaddvendor {
  addvendorlist: string;
   getVendorDatils: string;
    getPurcseAllD: string;
}

@Injectable()
export class PropurchaseDataProvider {
data: any;
vendorInfo:any;
purAllData:any;
  constructor(public http: HttpClient) {
   this.data = null;
 this.vendorInfo = null;
 this.purAllData = null;
  }

getAllVendorData() {          
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminAddVendor/getAllVendorData',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.addvendorlist;
    resolve(this.data);
  }, (err) =>  {
  });
});
}    

getVendorDatils(vendorNameNew) {
 this.vendorInfo = null;
if (this.vendorInfo) {
    return Promise.resolve(this.vendorInfo);
}         
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
vendorName: vendorNameNew,                                          
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminAddVendor/getOneVendorDa',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.vendorInfo = res.getVendorDatils;  
    resolve(this.vendorInfo);
  }, (err) =>  {
  });
});
}





getAllPurchaseData() {    
this.purAllData=null;      
if (this.purAllData) {
    return Promise.resolve(this.purAllData);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                         
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminAddPurchase/getAllPurchaseData',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.purAllData = res.getPurcseAllD;
    resolve(this.purAllData);
  }, (err) =>  {
  });
});
} 



}
