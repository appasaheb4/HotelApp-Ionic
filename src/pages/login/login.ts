import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { HomePage } from '../home/home'; 
import { WaiterdashboardPage } from '../waiterdashboard/waiterdashboard';
import { KitchendashboardPage } from '../kitchendashboard/kitchendashboard'; 
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   private loginForm:any;   
   private adminType : string;
    private  mobileNo : string;
    private password : string;
    private tokenNo : string;   
   constructor(private _form:FormBuilder,private alertCtrl: AlertController,private menu: MenuController,private navCtrl: NavController, private navParams: NavParams,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private storage:Storage) {
  this.loginForm=this._form.group({
'adminType': [null,  Validators.required],
'mobileNo': [null,  Validators.required],
'password': [null, Validators.required],
});

  }     

ionViewDidEnter() {
this.menu.enable(false, 'menu1');
}



login(){
let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
type: this.adminType,        
mobileNo: this.mobileNo,  
password: this.password,
tokenNo: '1234',
}   
this.http.post('http://hotelsameer.web44.net/LoginPage/loginMobile', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => {  
var newArry= res.toString();;
var array =  newArry.split('='); 
if(array[0]=="yes")    
{
loader.dismiss();   
this.storage.set('mobileNo',this.mobileNo);
this.storage.set('password',this.password);  
this.storage.set('userId', array[1]);  
this.storage.set('type', this.adminType);  
if(this.adminType=="Admin"){
this.navCtrl.setRoot(HomePage);
}
else if(this.adminType=="Waiter"){
this.navCtrl.setRoot(WaiterdashboardPage);
}
else{
this.navCtrl.setRoot(KitchendashboardPage);
}
}
else{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct mobile number and password.',
duration: 2000
});
toast.present();
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Please enter correct mobile number and password.',
duration: 2000
});
toast.present();
});
});

}

emailSent() {
let alert = this.alertCtrl.create({
title: 'Forgot Password',
inputs: [
{
name: 'email',
placeholder: 'Email'
},
],
buttons: [
{
text: 'Cancel',
},    
{
text: 'Sent',
handler: data => {
}
}
]
});
alert.present();
}

}
