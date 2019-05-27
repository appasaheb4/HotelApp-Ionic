import { Component } from '@angular/core';
import {  NavController, NavParams} from 'ionic-angular';
import {  Validators,ValidatorFn,AbstractControl,FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import {Storage} from '@ionic/storage';

//@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
public changeProfileForm:any;  
data ={oldPass:"",newPass:"",confPass:"",userId:""};
constructor(public storage:Storage,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
this.changeProfileForm=this._form.group({  
'this.data.oldPass': [null,  Validators.required],
'this.data.newPass' : ['',  Validators.required],
'this.data.confPass' : ['', [Validators.required,this.equalto('this.data.newPass')]],
});
this.storage.get('userId').then((val) => {
this.data.userId=val;
});
}
equalto(field_name): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {
let input = control.value;
let isValid=control.root.value[field_name]==input
if(!isValid){
return { 'equalTo': {isValid} }
}
else{
return null;
}
}    
}

changePass(){
let loader = this.loading.create({
content: 'Wating.........',
});

loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
oldPass: this.data.oldPass,    
newPass: this.data.newPass,
userId :this.data.userId
}  
this.http.post('http://hotelsameer.web44.net/MyProfile/changePasswordMobile', JSON.stringify(data), {
    headers: headersNew
  })  
  .subscribe(res =>  {
if(res.toString()=="yes")   
{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Password is changed.',
duration: 2000
});
toast.present();
this.navCtrl.pop();
}
else{
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Password is not changed.Please enter old password correct.',
duration: 4000
});
toast.present();
}   
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Network Error',
duration: 2000
});
toast.present();
});
});


}
}
