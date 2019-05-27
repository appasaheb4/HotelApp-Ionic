import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface inaddvendor {
  getPrintData: string;

}


@Injectable()
export class ProadminbillingprintProvider {
    printData:any;
  constructor(public http: HttpClient) {
    this.printData = null;
  }





}
