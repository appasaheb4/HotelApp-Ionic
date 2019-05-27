import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';



//@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }

}
