import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController,Platform} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {  MenuController } from 'ionic-angular/index';

import { ProadminbillingProvider } from '../../providers/proadminbilling/proadminbilling';
//@IonicPage()
@Component({
  selector: 'page-kitchendashboard',
  templateUrl: 'kitchendashboard.html',
providers:[ProadminbillingProvider]
})
export class KitchendashboardPage {

private getAllBookingList:any;
  constructor(private menu: MenuController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private  personservice:ProadminbillingProvider,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController) {
  }
             
 ionViewDidEnter() {
this.menu.enable(true, 'menu1');
this.getBookingData();
}



    getBookingData(){
this.personservice.getAllBookingKitchenData()
.then(data =>{  
this.getAllBookingList=data;
});
    }

     
doRefresh(refresher){
    this.getAllBookingList=null;
    this.getBookingData();
      if(refresher != 0)
         refresher.complete();
};

}
