import { Component,ViewChild } from '@angular/core';
import { Nav, Platform,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HomePage } from '../pages/home/home'; 
import { LoginPage } from '../pages/login/login';
import { WaiterdashboardPage } from '../pages/waiterdashboard/waiterdashboard';
import { KitchendashboardPage } from '../pages/kitchendashboard/kitchendashboard';   
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { SharePage } from '../pages/share/share';
import { TermsandconditionsPage } from '../pages/termsandconditions/termsandconditions';
import { UpdatePage } from '../pages/update/update';
import { SettingPage } from '../pages/setting/setting';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;
   rootPage: any;
   pages: Array<{title: string, component: any,icon: any}>;
  constructor(private iab: InAppBrowser,private socialSharing: SocialSharing,public alertCtrl: AlertController,private storage:Storage,private platform: Platform,private statusBar: StatusBar,private splashScreen: SplashScreen) {
    this.initializeApp();
  this.pages = [
      { title: 'Home', component: HomePage,icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderHome.png'  },
{ title: 'My Profile', component: MyprofilePage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderProfile.png' },
{ title: 'Share', component: SharePage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderShare.png' },
{ title: 'Update', component: UpdatePage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderUpdate.png' },
//{ title: 'Disclaimer', component: DisclaimerPage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderDiscalimer.png' },
{ title: 'Terms & Conditions', component: TermsandconditionsPage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderTearmandcondition.png' },
{ title: 'Setting', component: SettingPage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderSettting.png' },
{ title: 'Logout', component: LoginPage, icon:'http://hotelsameer.web44.net/Content/AppImages/SliderIcon/sliderLogout.png' },   
    ];


  }
initializeApp() {
    this.platform.ready().then(() => {
     this.statusBar.styleDefault();    
      this.splashScreen.hide();   
      this.showPage();
    });
  }

showPage(){
this.storage.get('mobileNo').then((val) => {
this.storage.get('type').then((val2) => {
if(val!=null && val2!=null)     
{
if(val2=="Admin"){
this.rootPage=HomePage;
}
else if(val2=="Waiter"){
this.rootPage=WaiterdashboardPage;
}
else{
this.rootPage=KitchendashboardPage;
}
}
else{

this.rootPage=LoginPage;
}
});   
});   
}

openPage(page) {
if(page.component==HomePage)
{
this.storage.get('type').then((val2) => {
if(val2=="Admin"){
this.nav.setRoot(HomePage);
}
else if(val2=="Waiter"){
this.nav.setRoot(WaiterdashboardPage);
}
else{
this.nav.setRoot(KitchendashboardPage);
}
}); 
}else if(page.component==LoginPage)
{

let confirm = this.alertCtrl.create({
      title: '',
      message: 'Are you sure you want to Sign out?',
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
           this.storage.remove('userId');
this.storage.remove('type');
this.storage.remove('mobileNo');
this.storage.remove('password'); 
this.nav.setRoot(page.component);
          }
        }
      ]
    });
    confirm.present();
}   
else if(page.component==SharePage)   
{

this.socialSharing.share('Hotel Sameer'+'\n',null,'http://menuapphybrid.newapptec.com/Content/Project/Hotel/HomePage/ApplicaitonIcon.png','http://hotelsameer.web44.net'); 
}else if(page.component==UpdatePage)   
{   
const browser = this.iab.create('http://hotelsameer.web44.net');}         
else
{
this.nav.push(page.component);
}

    
}



}
