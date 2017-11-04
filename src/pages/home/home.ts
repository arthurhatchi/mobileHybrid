import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var google;
declare var window;

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
  located;
  latLng = google.maps.LatLng(0.0, 0.0);
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  service = new google.maps.DistanceMatrixService();
  loader = this.loadingCtrl.create({
        content: 'Please wait...'
    });

  constructor(public navCtrl: NavController, public params: NavParams, private firebaseAnalytics: FirebaseAnalytics, public loadingCtrl: LoadingController, private geolocation: Geolocation, private socialSharing: SocialSharing) {
    //Analytics
    this.firebaseAnalytics.logEvent('page_view', {page: "detail"})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    
    this.start = params.get('start');
    this.end = params.get('end');
    this.travelMode = params.get('travelMode');
    this.located = params.get('located');
    this.latLng = params.get('LatLng');
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
    var init = this.start;
    var dest = this.end;
    
    if (this.located) {
        if  (this.start == "Ma position") {
            init = this.latLng;
        } 

        if (this.end == "Ma position") {
            dest = this.latLng;
        } 
    }
    this.directionsService.route({
      origin: init,
      destination: dest,
      travelMode: this.travelMode
    }, (response, status) => {
        if (status == "OK") {
            this.directionsDisplay.setDirections(response);
            this.calculateDistanceAndTime()
            this.loading(false);
        } else {
            this.loading(false);
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
                document.getElementById('infoLabel').textContent = 'Distance: ' + distance + '\nDurée du trajet: ' + duration;
                //this.displayAlert('Distance: ' + distance + ', durée du trajet: ' + duration);
              }
            }
          } else {
            document.getElementById('infoLabel').textContent = 'Aucune information sur le trajet';
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
  
  buttonClick() {
    this.loading(true);
    var url = 'https://www.google.com/maps/dir/?api=1&origin='+ this.start +'&destination='+this.end +'&travelmode='+ this.travelMode;
    
    var text = 'Je pars de ' + this.start + ' et je vais à ' + this.end + '. Infos: ' + document.getElementById('infoLabel').textContent + ':  ' + url; 
    this.socialSharing.share(text, 'Mon initéraire', null).then(() => {
            this.loading(false);
    }).catch(() => {
            this.loading(false);
    });
  }

}