import { Component } from '@angular/core';
import { ActionSheetController,Platform, NavController, NavParams} from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import {  Validators,FormBuilder } from '@angular/forms';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera'; 

interface myProfile {
  userAllInformation: string;
}
declare var cordova: any;

//@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
public updateStatus: boolean = false;     
public disName: boolean = false;
public myprofileForm:any;

 data = {fullname:"",mobileNo:"",email:"",adharNo:"",note:"",userId:""};

public base64Image:any;
public allUserData:any;
profileIcon: string = null;   
constructor(public platform: Platform,public actionSheetCtrl: ActionSheetController,private transfer: Transfer,private camera: Camera, private file: File, private filePath: FilePath,public http: HttpClient,public loading: LoadingController,public toastCtrl: ToastController,public storage:Storage,public _form:FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
this.myprofileForm=this._form.group({  
'this.data.fullname': [null,  Validators.required],
'this.data.mobileNo': [null, Validators.compose([Validators.maxLength(10), Validators.required])],
'this.data.email' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)])],
'this.data.adharNo': [null,  Validators.required],
'this.data.note' : [null]
});
this.storage.get('userId').then((val) => {
this.data.userId=val;
});
this.loadData();
}      
 


public presentActionSheet() {
let actionSheet = this.actionSheetCtrl.create({
title: 'Select Image Source',
buttons: [
{
text: 'Load from Library',
handler: () => {
this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
}
},
{
text: 'Use Camera',
handler: () => {
this.takePicture(this.camera.PictureSourceType.CAMERA);
}
},
{
text: 'Cancel',
role: 'cancel'
}
]
});
actionSheet.present();
}

public takePicture(sourceType) {
// Create options for the Camera Dialog
var options = {
quality: 100,
sourceType: sourceType,
saveToPhotoAlbum: false,
correctOrientation: true
};
  	 
// Get the data of an image
this.camera.getPicture(options).then((imagePath) => {
// Special handling for Android library
if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
this.filePath.resolveNativePath(imagePath)
.then(filePath => {
let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
});
} else {
var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
}
}, (err) => {
this.presentToast('Error while selecting image.');
});
}


//Create a new name for the image
private createFileName() {
var d = new Date(),
n = d.getTime(),
newFileName =  n + ".jpg";
return newFileName;
}
   
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
this.profileIcon = newFileName;
this.uploadImage(newFileName);
}, error => {
this.presentToast('Error while storing file.');
});
}
   
private presentToast(text) {
let toast = this.toastCtrl.create({
message: text,
duration: 3000,
position: 'top'
});
toast.present();
}
   
// Always get the accurate path to your apps folder
public pathForImage(img) {
if (img === null) {
return '';
} else {
return cordova.file.dataDirectory + img;
}
}



public uploadImage(val) {   
var url = "http://hotelsameer.web44.net/MyProfile/mobileUploadImage";
var targetPath = this.pathForImage(val);
var options = {
chunkedMode: false,
fileKey: "file",      
fileName: val,
mimeType: "multipart/form-data",
params : {
'imageName': val,'userId': this.data.userId }
};   
const fileTransfer: TransferObject = this.transfer.create();
let loader = this.loading.create({
content: 'Wait...',
});
loader.present();
fileTransfer.upload(targetPath,url, options).then(data => {
loader.dismissAll()

this.platform.ready()
.then(() => {
console.log(this.platform.is('android'))
}) 
console.log('Image succesful uploaded.');
this.loadData();
}, err => {
loader.dismissAll()
alert('Error while uploading file.');
});
} 

  

loadData(){  
this.allUserData=null;
let loader = this.loading.create({
content: 'Wating.........',   
});                            
loader.present().then(() => {
let headersNew = new HttpHeaders();
headersNew.append('Content-Type', 'application/json');
let data = {
id: this.data.userId,                   
}     
this.http.post<myProfile>('http://hotelsameer.web44.net/MyProfile/getUserAllInformation', JSON.stringify(data), {
    headers: headersNew
  })   
  .subscribe(res =>  {
this.allUserData=res.userAllInformation;
this.data.fullname=this.allUserData[0].fullName;
this.data.mobileNo=this.allUserData[0].mobileNo;
this.data.email=this.allUserData[0].email;
this.data.adharNo=this.allUserData[0].adharNo;
this.data.note=this.allUserData[0].note;   
this.base64Image=this.allUserData[0].imagePath;  
loader.dismiss();
}, (err) => {     
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Data not found.',       
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
fullName: this.data.fullname,
mobileNo: this.data.mobileNo,
email: this.data.email,
adharNo: this.data.adharNo,
note: this.data.note,   
userId: this.data.userId
}     
this.http.post('http://hotelsameer.web44.net/MyProfile/updateDataMobile', JSON.stringify(data), {
    headers: headersNew  
  })
  .subscribe(res =>  {
console.log(res);
if(res.toString()=="yes")             
{
loader.dismiss();     
let toast = this.toastCtrl.create({
message: 'Update Data',
duration: 2000    
});
toast.present(); 
this.loadData();
this.updateStatus=false;
this.disName=false;
}
}, (err) => {
loader.dismiss();
let toast = this.toastCtrl.create({
message: 'Not Update Data.',
duration: 2000
});
toast.present();
});
});
}



editAction(){
this.updateStatus=true;
this.disName=true;
}
  
openChangePassword(){
this.navCtrl.push(ChangepasswordPage);
}

}
