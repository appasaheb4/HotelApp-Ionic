import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-termsandconditions',
  templateUrl: 'termsandconditions.html',
})
export class TermsandconditionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsandconditionsPage');
  }

}
