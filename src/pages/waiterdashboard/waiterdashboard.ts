import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {  MenuController } from 'ionic-angular/index';
import { ProwaiterdashboardProvider } from '../../providers/prowaiterdashboard/prowaiterdashboard';
   
interface inaddvendor {                      
  extraMenuList: string;
}
import { WaitertablebookingextraPage } from '../waitertablebookingextra/waitertablebookingextra';


import { FreetablePage } from '../freetable/freetable';
import { BookingtablePage } from '../bookingtable/bookingtable';



//@IonicPage()
@Component({
  selector: 'page-waiterdashboard',
  templateUrl: 'waiterdashboard.html',
providers:[ProwaiterdashboardProvider] 
})
export class WaiterdashboardPage {
@ViewChild('pageSlider') pageSlider: Slides;      
tabs: any = '0';
private bookingData:any;
private userIdNew:any;
private freeTable=FreetablePage;
private bookingTable=BookingtablePage;

  constructor(private  personservice:ProwaiterdashboardProvider,public alertCtrl: AlertController,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams,private menu: MenuController) {
this.storage.get('userId').then((val) => {
this.userIdNew=val;
this.getwaiterBookingData(val);
}); 
}

ionViewDidEnter() {
this.menu.enable(true, 'menu1');
}

ionViewWillEnter(){
this.getwaiterBookingData(this.userIdNew);
}

openPage(page) {
    this.navCtrl.push(page);
}  




getwaiterBookingData(userId){
this.bookingData=null;
this.personservice.getBookingData(userId)
.then(data =>{     
this.bookingData=data;
console.log(this.bookingData[0].extraMenuList);   
});
}



addExtraMenu(id,tableNo,tableCode,maxValue){
this.navCtrl.push(WaitertablebookingextraPage,{
 "param0":id,"param1":tableNo,"param2":tableCode,"param3":maxValue
});
}

deleteData(localId,tableNo){
let confirm = this.alertCtrl.create({
      title: 'Hint',
      message: 'Are you sure table booking remove !',
      buttons: [
        {   
          text: 'No',  
          handler: () => {
            console.log('Disagree clicked');
          }
        },  
        {
          text: 'Yes',
          handler: () => {
let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: localId,
  tableNo:tableNo,   
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/deleteTableBooking', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Booking table remove.',
    duration: 2000    
  });   
  toast.present();
   this.getwaiterBookingData(this.userIdNew);
  this.pageSlider.slideTo(1);
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Booking table not remove.',
		    duration: 2000
		  });
		  toast.present();
});
 });
    }
        }
      ]
    });
    confirm.present();
}



removeMenuItem(id){
let confirm = this.alertCtrl.create({
      title: 'Hint',
      message: 'Are you sure remove menu !',
      buttons: [
        {   
          text: 'No',  
          handler: () => {
            console.log('Disagree clicked');
          }
        },  
        {
          text: 'Yes',
          handler: () => {
let loader = this.loading.create({    
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: id,   
}    
this.http.post('http://hotelsameer.web44.net/TableBooking/deleteExtraMenuMobile', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Menu Remove.',
    duration: 2000    
  });   
  toast.present();
  this.getwaiterBookingData(this.userIdNew);
  this.pageSlider.slideTo(1);
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Menu Remove Not Working.',
		    duration: 2000
		  });
		  toast.present();
});
 });
    }
        }
      ]
    });
    confirm.present();
}


placeOrder(id){
 let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: id, 
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/placeOrderMobile', JSON.stringify(data), {
    headers: headersNew     
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Place Order.',
    duration: 2000
  });
  toast.present();
    this.getwaiterBookingData(this.userIdNew);
  this.pageSlider.slideTo(1);
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Not Place Order.',
		    duration: 2000
		  });
		  toast.present();
});
 });
}

kitchenRemove(id){
 let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: id,     
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/removeKitenOrder', JSON.stringify(data), {
    headers: headersNew     
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Remove Kitchen Order.',
    duration: 2000
  });
  toast.present();
    this.getwaiterBookingData(this.userIdNew);
  this.pageSlider.slideTo(1);
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Not Remove Kitchen Order.',
		    duration: 2000
		  });
		  toast.present();
});
 });
}







 selectTab(index) {     
this.pageSlider.slideTo(index);
}
changeWillSlide($event) {
this.tabs = $event._snapIndex.toString();
}
}
