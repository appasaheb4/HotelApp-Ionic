import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-waitertableview',
  templateUrl: 'waitertableview.html',
})
export class WaitertableviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitertableviewPage');
  }

}
