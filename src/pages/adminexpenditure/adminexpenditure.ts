import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

import { ProadminexpenditureProvider } from '../../providers/proadminexpenditure/proadminexpenditure';
//@IonicPage()
@Component({
  selector: 'page-adminexpenditure',
  templateUrl: 'adminexpenditure.html',
  providers:[ProadminexpenditureProvider]
})
export class AdminexpenditurePage {
@ViewChild('pageSlider') pageSlider: Slides; 
tabs: any = '0';
private addvendor:any; 
   data ={id:"",date:"",expFor:"",paidTo:"",amount:"",payMode:"",note:"",userId:""};
    showData ={id:"",data:"",expFor:"",paidTo:"",amount:"",payMode:"",note:"",userId:""};
    public getAllDataExpen:any;
    updateStatus: boolean = false;
  constructor(public alertCtrl: AlertController,private  personservice:ProadminexpenditureProvider,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
     this.addvendor=this._form.group({
'this.data.date': [null,  Validators.required],
'this.data.expFor': [null],        
'this.data.paidTo': [null],
'this.data.amount': [null,  Validators.required],
'this.data.payMode':  [null],
'this.data.note': [null]
});
this.data.date=new Date().toISOString();

this.storage.get('userId').then((val) => {
this.data.userId=val;
}); 
this.getExpData();
  }

getExpData(){
this.getAllDataExpen=null;
this.personservice.getAllExpData()
.then(data =>{  
this.getAllDataExpen=data;
});
}    


selectTab(index) {     
this.pageSlider.slideTo(index);
}


changeWillSlide($event) {
this.tabs = $event._snapIndex.toString();
}


editParaPass(id,date,expFor,paidTo,amount,payMode,note){   
if(id!=null){
this.data.id=id;
this.data.date=date;
this.data.expFor=expFor;
this.data.paidTo=paidTo;
this.data.amount=amount;
this.data.payMode=payMode;
this.data.note=note;
this.updateStatus = true;   
this.pageSlider.slideTo(0);
}
}


saveData(){
    let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  date: this.data.date,
  expFor: this.data.expFor,
  paidTo: this.data.paidTo,
  amount: this.data.amount, 
  payMode: this.data.payMode,
  note:this.data.note, 
  userId:this.data.userId,
}  
this.http.post('http://hotelsameer.web44.net/AdminExpenditure/insertMobileData', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Data saved.',
    duration: 2000
  });
  toast.present();
  this.pageSlider.slideTo(1);
  this.getExpData();
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Data not saved.',
		    duration: 2000
		  });
		  toast.present();
});
 });

 }


updateData(){
    let loader = this.loading.create({
    content: 'Wating.........',
  });
loader.present().then(() => {    
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
  let data = {
  id: this.data.id,
  date: this.data.date,
  expFor: this.data.expFor,
  paidTo: this.data.paidTo,
  amount: this.data.amount, 
  payMode: this.data.payMode,
  note:this.data.note,  
}  
this.http.post('http://hotelsameer.web44.net/AdminExpenditure/updateMobileData', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Data are update.',
    duration: 2000
  });
  toast.present();
   this.pageSlider.slideTo(1);
  this.getExpData();
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Data are not update.',
		    duration: 2000
		  });
		  toast.present();
});
 });
}


deleteData(localId){
let confirm = this.alertCtrl.create({
      title: 'Hint',
      message: 'Are you sure want to delete this expenditure !',
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
}  
this.http.post('http://hotelsameer.web44.net/AdminExpenditure/deleteMobileData', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  if(res.toString()=="yes")
  {
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Delete data.',
    duration: 2000
  });
  toast.present();
  this.getExpData();
  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Delete not data.',
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
}
