import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface expd {
  addexplist: string;
}

@Injectable()
export class ProadminexpenditureProvider {
data: any;
  constructor(public http: HttpClient) {
     this.data = null; 
  }


getAllExpData() {    
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
    this.http.post<expd>('http://hotelsameer.web44.net/AdminExpenditure/getAllExpData',JSON.stringify(data), {
    headers: headersNew     
  })
  .subscribe(res =>  { 
    this.data = res.addexplist;
    resolve(this.data);
  }, (err) =>  {
  });
});
}

}
