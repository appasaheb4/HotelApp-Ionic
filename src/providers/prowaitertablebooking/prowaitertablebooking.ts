import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface inaddvendor {
  menuList: string;
    getSubMenuList:string;
    getPurcseAllD:string;
    getQtyManagementDetails:string;
}

@Injectable()
export class ProwaitertablebookingProvider {
data: any;
vendorInfo:any;
  constructor(public http: HttpClient) {
     this.data = null;
    this.vendorInfo = null;
  }

getAllMenuList() {          
if (this.data) {
    return Promise.resolve(this.data);
}    
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
userId: 1,                                       
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AddMenuAndSubmenu/getAllMenuList',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.menuList;
    resolve(this.data);
  }, (err) =>  {
  });
});
}



getSubMenuPro(menu) {
 this.vendorInfo = null;
if (this.vendorInfo) {
    return Promise.resolve(this.vendorInfo);
}         
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
menu: menu,                                             
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AddMenuAndSubmenu/getOneMenuSub',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.vendorInfo = res.getSubMenuList;  
    resolve(this.vendorInfo);  
  }, (err) =>  {
  });
});
}


getDrinkPro(menu) {
 this.vendorInfo = null;
if (this.vendorInfo) {
    return Promise.resolve(this.vendorInfo);
}         
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
menu: menu,                                             
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminAddPurchase/getAllPurProName',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.vendorInfo = res.getPurcseAllD;  
    resolve(this.vendorInfo);  
  }, (err) =>  {
  });
});
}

getDrinkProItemDatils(menu) {
 this.vendorInfo = null;
if (this.vendorInfo) {
    return Promise.resolve(this.vendorInfo);
}         
return new Promise(resolve => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {   
menu: menu,                                             
} 
    this.http.post<inaddvendor>('http://hotelsameer.web44.net/AdminAddPurchase/getQtyManagementDetails',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.vendorInfo = res.getQtyManagementDetails;  
    resolve(this.vendorInfo);    
  }, (err) =>  {
  });
});
}



}
