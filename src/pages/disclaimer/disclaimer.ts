import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
})
export class DisclaimerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DisclaimerPage');
  }

}
