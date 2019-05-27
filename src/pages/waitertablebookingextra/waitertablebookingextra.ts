import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides,AlertController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

import { ProwaitertablebookingProvider } from '../../providers/prowaitertablebooking/prowaitertablebooking';
import { WaiterdashboardPage } from '../waiterdashboard/waiterdashboard';
//@IonicPage()
@Component({
  selector: 'page-waitertablebookingextra',
  templateUrl: 'waitertablebookingextra.html',
 providers:[ProwaitertablebookingProvider] 
})
export class WaitertablebookingextraPage {
 private tableBooking:any; 
    data ={id:"",date:"",tableNo:"",tableCode:"",menu:"",submenu:"",qty:"",userId:"",maxValue:"",items:""};
    private menuList:any;
    private submenuList:any;
    private qtyDatails:any;
  qtyManagentStatus: boolean = false;
  constructor(private  personservice:ProwaitertablebookingProvider,public alertCtrl: AlertController,private storage:Storage,private http: HttpClient,private loading: LoadingController,private toastCtrl: ToastController,private _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {

 this.tableBooking=this._form.group({   
'data.date': [null,  Validators.required],
'data.menu': [null,  Validators.required],        
'data.submenu': [null, Validators.required],
'data.qty': [null,  Validators.required],
'data.items': [null],
});
this.data.date=new Date().toISOString();
this.storage.get('userId').then((val) => {
this.data.userId=val;
});  


this.data.id = navParams.get('param0');
this.data.tableNo = navParams.get('param1');
this.data.tableCode = navParams.get('param2');
this.data.maxValue = navParams.get('param3');

this.getMenuList();
  }

getMenuList(){
this.personservice.getAllMenuList()
.then(data =>{     
this.menuList=data;
});
}  


getSubMenuList(){ 
if(this.data.menu=="Drinks"){
this.personservice.getDrinkPro(this.data.menu)
.then(data =>{      
this.submenuList=data;
});
}else{
this.personservice.getSubMenuPro(this.data.menu)
.then(data =>{  
this.submenuList=data;
});
}
}

getDrinkProItems(){
if(this.data.menu=="Drinks"){
this.personservice.getDrinkProItemDatils(this.data.submenu)
.then(data =>{      
this.qtyDatails=data;
console.log(data);
this.data.items=this.qtyDatails[0].outOf+' Qty = 1 Box';    
this.qtyManagentStatus=true;
});
}
else{
this.qtyManagentStatus=false;
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
  id: this.data.id,   
  maxValue:this.data.maxValue,
  date: this.data.date,
  tableNo: this.data.tableNo,
  tableCode: this.data.tableCode,
  menuName: this.data.menu, 
  subMenuName: this.data.submenu,
  qty: this.data.qty,
  userId:this.data.userId,
}  
this.http.post('http://hotelsameer.web44.net/TableBooking/addExtraMenuItem', JSON.stringify(data), {
    headers: headersNew  
  })
.subscribe(res => { 
  
  if(res.toString()=="yes")
  {   
    loader.dismiss();
    let toast = this.toastCtrl.create({  
    message: 'Menu added.',
    duration: 2000
  });
  toast.present();
 this.data.menu="";
this.data.submenu="";
this.data.qty="";
this.data.maxValue=this.data.maxValue+1;
this.data.date=new Date().toISOString();

  }
}, (err) => {
	loader.dismiss();
	  let toast = this.toastCtrl.create({
		    message: 'Menu not added.',
		    duration: 2000
		  });
		  toast.present();
});
 });

 }



}
