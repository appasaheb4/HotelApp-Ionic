import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';   


import { PropurchaseDataProvider } from '../../providers/propurchase-data/propurchase-data';
//@IonicPage()
@Component({
  selector: 'page-adminpurchase',
  templateUrl: 'adminpurchase.html', 
  providers:[PropurchaseDataProvider] 
})
export class AdminpurchasePage {

@ViewChild('pageSlider') pageSlider: Slides; 
tabs: any = '0';
public purchForm:any;
updateStatus: boolean = false;
private addVendorData:any;
private getOneVendorInfo:any;
private purAllData:any;
   data ={id:"",date:"",vendorName:"",contactNo:"",panNo:"",adharNo:"",gstNo:"",proName:"",qty:0.0,rate:0.0,price:0.0,gstper:0.0,gstamount:0.0,total:0.0,note:"",userId:""};
  constructor(private  personservice:PropurchaseDataProvider,public alertCtrl: AlertController,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

 this.purchForm=this._form.group({
'data.date': [null,  Validators.required],
'data.vendorName': [null,  Validators.required],        
'data.contactNo': [null],
'data.panNo': [null],
'data.adharNo':  [null],
'data.gstNo': [null],
'data.proName': [null, Validators.required],
'data.qty': [null, Validators.required],
'data.rate': [null, Validators.required],
'data.price': [null , Validators.required],
'data.gstper': [null, Validators.required],
'data.gstamount': [null],
'data.total': [null],
'data.note': [null],
'data.userId': [null],
});
this.data.date=new Date().toISOString();
this.getVendorDatils();
this.getPurcAllData();
this.storage.get('userId').then((val) => {
this.data.userId=val;
}); 
}



getVendorDatils(){
this.addVendorData=null;
this.personservice.getAllVendorData()
.then(data =>{  
this.addVendorData=data;
});
}


getPurcAllData(){
this.purAllData=null;
this.personservice.getAllPurchaseData()
.then(data =>{  
this.purAllData=data;
});
}

vendroDatils(){             
this.personservice.getVendorDatils(this.data.vendorName)
.then(data =>{  
this.getOneVendorInfo=data;
this.data.contactNo=this.getOneVendorInfo[0].contactNo;
this.data.panNo=this.getOneVendorInfo[0].pancardNo;
this.data.adharNo=this.getOneVendorInfo[0].adharNo;
this.data.gstNo=this.getOneVendorInfo[0].gstNo;
});
}   



editParaPass(id,date,vendorName,contactNo,panNo,adharNo,gstNo,proName,qty,rate,price,gstper,gstamount,total,note){   
if(id!=null){
this.data.id=id;
this.data.date=date;
this.data.vendorName=vendorName;
this.data.contactNo=contactNo;
this.data.panNo=panNo;
this.data.adharNo=adharNo;
this.data.gstNo=gstNo;
this.data.proName=proName;
this.data.qty=qty;
this.data.rate=rate;
this.data.price=price;
this.data.gstper=gstper;
this.data.gstamount=gstamount;
this.data.total=total;
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
  vendorName: this.data.vendorName,
  contactNo: this.data.contactNo,
  panNo: this.data.panNo,
  adharNo:this.data.adharNo,
  gstNo:this.data.gstNo,
  proName:this.data.proName,
  qty:this.data.qty,
  rate:this.data.rate,
  price:this.data.price,
  gstper:this.data.gstper,
  gstamount:this.data.gstamount,
  total:this.data.total,
  note:this.data.note, 
  userId:this.data.userId,
}  
this.http.post('http://hotelsameer.web44.net/AdminAddPurchase/insertMobileData', JSON.stringify(data), {
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
  this.getPurcAllData();
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
  vendorName: this.data.vendorName,
  contactNo: this.data.contactNo,
  panNo: this.data.panNo,
  adharNo:this.data.adharNo, 
  gstNo:this.data.gstNo,
  proName:this.data.proName,
  qty:this.data.qty,
  rate:this.data.rate,
  price:this.data.price,
  gstper:this.data.gstper,
  gstamount:this.data.gstamount,
  total:this.data.total,
  note:this.data.note,    
}  
this.http.post('http://hotelsameer.web44.net/AdminAddPurchase/updateMobileData', JSON.stringify(data), {
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
  this.getPurcAllData();
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
this.http.post('http://hotelsameer.web44.net/AdminAddPurchase/deleteMobileData', JSON.stringify(data), {
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
  this.getPurcAllData();
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

cal(){
var newQty=this.data.qty;
 var newRate=this.data.rate;
  var newGstPer=this.data.gstper;
    this.data.price=(this.data.qty*this.data.rate);
  this.data.gstamount=(this.data.price*newGstPer)/100;
  this.data.total=(this.data.gstamount+this.data.price);
}



selectTab(index) {     
this.pageSlider.slideTo(index);
}

changeWillSlide($event) {
this.tabs = $event._snapIndex.toString();
}  

 }  
