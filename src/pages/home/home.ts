import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { LoadingController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start;
  end;
  travelMode;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  service = new google.maps.DistanceMatrixService();
  loader = this.loadingCtrl.create({
        content: 'Please wait...'
    });
  
  constructor(public navCtrl: NavController, public params: NavParams, private firebaseAnalytics: FirebaseAnalytics, public loadingCtrl: LoadingController) {
    //Analytics
    this.firebaseAnalytics.logEvent('page_view', {page: "detail"})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    this.infoLabel = "test";
    this.start = params.get('start');
    this.end= params.get('end');
    this.travelMode = params.get('travelMode');
    this.calculateAndDisplayRoute();
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: 46.3, lng: 2.22},
      zoom: 4
    });
   
    this.directionsDisplay.setMap(this.map);
  } 
        
  calculateAndDisplayRoute() {
    this.loading(true);
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: this.travelMode
    }, (response, status) => {
        this.loading(false);
        if (status == "OK") {
            this.directionsDisplay.setDirections(response);
            this.calculateDistanceAndTime()
            
        } else {
            this.displayAlert('Erreur:' + status);
            this.navCtrl.pop();
        }     
        
    });
  }
  
  calculateDistanceAndTime() {
    this.service.getDistanceMatrix(
    {
        origins: [this.start],
        destinations: [this.end],
        travelMode: this.travelMode
      },   (response, status) => {
          if (status == 'OK') {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];
                this.displayAlert('Distance: ' + distance + ', durée du trajet: ' + duration);
              }
            }
          } else {
            this.displayAlert('Distance introuvable');
          }
      });
  }

  displayAlert(text:string) {
    window.alert(text);
  }
  
  loading(on:Boolean) {
    if (on) {
        this.loader.present();
    } else {
        this.loader.dismiss();
    }
  }

}