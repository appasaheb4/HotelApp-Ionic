import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-kitchenorderview',
  templateUrl: 'kitchenorderview.html',
})
export class KitchenorderviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KitchenorderviewPage');
  }

}
