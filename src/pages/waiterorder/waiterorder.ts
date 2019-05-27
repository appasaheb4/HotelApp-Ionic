import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-waiterorder',
  templateUrl: 'waiterorder.html',
})
export class WaiterorderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaiterorderPage');
  }

}
