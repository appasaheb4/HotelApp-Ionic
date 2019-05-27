import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

import { ProaddvendorProvider } from '../../providers/proaddvendor/proaddvendor';
//@IonicPage()
@Component({
  selector: 'page-adminaddvendor',
  templateUrl: 'adminaddvendor.html',
  providers:[ProaddvendorProvider]
})
export class AdminaddvendorPage {
@ViewChild('pageSlider') pageSlider: Slides; 
tabs: any = '0';
private addvendor:any; 
   filedData ={id:"",date:"",vendorName:"",address:"",contactNo:"",email:"",panNo:"",adharNo:"",gstNo:"",note:"",userId:""};
    showData ={id:"",data:"",time:"",vendorName:"",address:"",contactNo:"",email:"",panNo:"",adharNo:"",gstNo:"",userId:""};
    public getAllDataVendor:any;
updateStatus: boolean = false;
  constructor(public alertCtrl: AlertController,private  personservice:ProaddvendorProvider,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
     this.addvendor=this._form.group({
'filedData.date': [null,  Validators.required],
'filedData.vendorName': [null,  Validators.required],        
'filedData.address': [null],
'filedData.contactNo': [null,  Validators.required],
'filedData.email':  [null, Validators.compose([Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'filedData.panNo': [null],
'filedData.adharNo': [null],
'filedData.note': [null],
'filedData.gstNo': [null, Validators.required],
});
this.filedData.date=new Date().toISOString();

this.storage.get('userId').then((val) => {
this.filedData.userId=val;
}); 

this.getVendorData();
  }

getVendorData(){
this.getAllDataVendor=null;
this.personservice.getAllVendorData()
.then(data =>{  
this.getAllDataVendor=data;
});
}


selectTab(index) {     
this.pageSlider.slideTo(index);
}


changeWillSlide($event) {
this.tabs = $event._snapIndex.toString();
}


editParaPass(id,date,vendorName,address,contactNo,email,panNo,adharNo,gstNo,note){   
if(id!=null){
this.filedData.id=id;
this.filedData.date=date;
this.filedData.vendorName=vendorName;
this.filedData.address=address;
this.filedData.contactNo=contactNo;
this.filedData.email=email;
this.filedData.panNo=panNo;
this.filedData.adharNo=adharNo;
this.filedData.gstNo=gstNo;
this.filedData.note=note;
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
  date: this.filedData.date,
  vendorName: this.filedData.vendorName,
  address: this.filedData.address,
  contactNo: this.filedData.contactNo, 
  email: this.filedData.email,
  panNo: this.filedData.panNo,
  adharNo:this.filedData.adharNo,
  gstNo:this.filedData.gstNo, 
  note:this.filedData.note, 
  userId:this.filedData.userId,
}  
this.http.post('http://hotelsameer.web44.net/AdminAddVendor/insertMobileData', JSON.stringify(data), {
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
  this.getVendorData();
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
  id: this.filedData.id,
  date: this.filedData.date,
  vendorName: this.filedData.vendorName,
  address: this.filedData.address,
  contactNo: this.filedData.contactNo, 
  email: this.filedData.email,
  panNo: this.filedData.panNo,
  adharNo:this.filedData.adharNo,
  gstNo:this.filedData.gstNo, 
  note:this.filedData.note, 
}  
this.http.post('http://hotelsameer.web44.net/AdminAddVendor/updateMobileData', JSON.stringify(data), {
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
  this.getVendorData();
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
      message: 'Are you sure want to delete this product !',
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
this.http.post('http://hotelsameer.web44.net/AdminAddVendor/deleteMobileData', JSON.stringify(data), {
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
  this.getVendorData();
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
