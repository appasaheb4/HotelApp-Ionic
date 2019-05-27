import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {  MenuController } from 'ionic-angular/index';


import { ProwaiterdashboardProvider } from '../../providers/prowaiterdashboard/prowaiterdashboard';


import { WaitertablebookingPage } from '../waitertablebooking/waitertablebooking';
//@IonicPage()
@Component({
  selector: 'page-bookingtable',
  templateUrl: 'bookingtable.html',
providers:[ProwaiterdashboardProvider] 
})
export class BookingtablePage {

private userIdNew:any;
private tableData:any;
  constructor(private  personservice:ProwaiterdashboardProvider,public alertCtrl: AlertController,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams,private menu: MenuController) {
this.getTableList();
this.storage.get('userId').then((val) => {
this.userIdNew=val;
}); 
}

  getTableList(){   
this.personservice.getTableListBooking()
.then(data =>{     
this.tableData=data;
});
}




}
