import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'IndexPage',
  templateUrl: 'index.html',
})
export class IndexPage {
  travelMode = "DRIVING";
  start = "nice";
  destination = "nanterre";
  loader = this.loadingCtrl.create({
        content: 'Please wait...'
    }); 
    located = false;
  latLng = new google.maps.LatLng(0.0, 0.0);
  constructor(private firebaseAnalytics: FirebaseAnalytics, public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public loadingCtrl: LoadingController) {
  
  }

  travelClick(type){
    this.travelMode = type;
  }

  directionClick(event){
  // Analytics
    this.firebaseAnalytics.logEvent('search', {'travelMode': this.travelMode, 'start': this.start, 'end': this.destination})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    
    this.navCtrl.push(HomePage,{'start':this.start, 'end': this.destination, 'travelMode': this.travelMode, 'located': this.located, 'LatLng': this.latLng},{animate:false, direction: 'forward',});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    
    
    //Analytics
    this.firebaseAnalytics.logEvent('page_view', {page: "lobby"})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
  }
  
  locateUserEnd() {
    this.loading(true);
    this.geolocation.getCurrentPosition().then((data) => {
            console.log('My latitude : ', data.coords.latitude);
            console.log('My longitude: ', data.coords.longitude);
            this.located = true;
            this.latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            this.destination = "Ma position";
            this.loading(false);
        }).catch((error) => {
            console.log('Error getting location', error);
            this.loading(false);
        });

  }
  locateUserStart() {
    this.loading(true);
    this.geolocation.getCurrentPosition().then((data) => {
            console.log('My latitude : ', data.coords.latitude);
            console.log('My longitude: ', data.coords.longitude);
            this.located = true;
            this.latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            this.start = "Ma position";
            this.loading(false);
        }).catch((error) => {
            console.log('Error getting location', error);
            this.loading(false);
        });
  }
  
  
  loading(on:Boolean) {
    if (on) {
        this.loader.present();
    } else {
        this.loader.dismiss();
    }
  }

  
}
