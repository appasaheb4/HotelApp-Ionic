import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface inaddvendor {
  addvendorlist: string;
}

@Injectable()
export class ProaddvendorProvider {
data: any;
  constructor(public http: HttpClient) {
    this.data = null;  
  }

getAllVendorData() {    
this.data=null;      
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

}
