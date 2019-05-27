import { Component } from '@angular/core';
import { NavController,Platform  } from 'ionic-angular';
import {  MenuController } from 'ionic-angular/index';
import { AdminbillingPage } from '../adminbilling/adminbilling';
import { AdminaddvendorPage } from '../adminaddvendor/adminaddvendor';
import { AdminpurchasePage } from '../adminpurchase/adminpurchase';
import { AdminexpenditurePage } from '../adminexpenditure/adminexpenditure';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {      

private billing=AdminbillingPage;
private addvendor=AdminaddvendorPage;
private adminPurch=AdminpurchasePage;
private adminexpenture=AdminexpenditurePage;
  constructor(public navCtrl: NavController,private menu: MenuController) {
}
   
 ionViewDidEnter() {
this.menu.enable(true, 'menu1');
}
 
openPage(page) {
    this.navCtrl.push(page);
}   



}
