import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';



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
  travelMode = "DRIVING";
  start = "nice";
  destination = "nanterre";

  constructor(private firebaseAnalytics: FirebaseAnalytics, public navCtrl: NavController, public navParams: NavParams) {
  }

  travelClick(type){
    this.travelMode = type;
  }

  directionClick(event){
  // Analytics
    this.firebaseAnalytics.logEvent('search', {'travelMode': this.travelMode, 'start': this.start, 'end': this.destination})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    
    this.navCtrl.push(HomePage,{'start':this.start, 'end': this.destination, 'travelMode': this.travelMode},{animate:false, direction: 'forward',});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    
    //Analytics
    this.firebaseAnalytics.logEvent('page_view', {page: "lobby"})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }
  
}
