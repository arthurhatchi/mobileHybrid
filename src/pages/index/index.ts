import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'IndexPage',
  templateUrl: 'index.html',
})
export class IndexPage {

  travelMode;
  start = "nice";
  destination = "nanterre";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  travelClick(type){
    this.travelMode = type;
  }

  directionClick(event){
    this.navCtrl.push(HomePage,{'start':this.start, 'end': this.destination, 'travelMode': this.travelMode},{animate:false, direction: 'forward',});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }

}
