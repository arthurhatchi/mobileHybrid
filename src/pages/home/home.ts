import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

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
  
  
  constructor(public navCtrl: NavController,public params: NavParams) {
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

  travelClick(type){
    this.travelMode = type;
  }

  buttonClick() {
    if (this.start === "") {
        this.displayAlert('Veuillez choisir une ville de départ');  
    } else if (this.end === "") {
        this.displayAlert('Veuillez choisir une ville d\'arrivée'); 
    } else {
        this.calculateAndDisplayRoute();
    }        
  }
        
  calculateAndDisplayRoute() {
    this.loading(true);
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: this.travelMode
    }, (response, status) => {
    
        switch (status) {
            case 'OK': 
            this.directionsDisplay.setDirections(response);
            this.calculateDistanceAndTime()
            break
            
            case 'NOT_FOUND':
            this.displayAlert('L\'une des villes est introuvable');
            break
          
            case 'ZERO_RESULT':
            this.displayAlert('Itinéraire introuvable');
            break
            
            default:
            this.displayAlert('Erreur inconnue ' + status);
            break
        }      
        this.loading(false);
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
  }

}