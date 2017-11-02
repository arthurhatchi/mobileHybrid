webpackJsonp([0],{

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexPageModule", function() { return IndexPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index__ = __webpack_require__(267);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IndexPageModule = (function () {
    function IndexPageModule() {
    }
    return IndexPageModule;
}());
IndexPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__index__["a" /* IndexPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__index__["a" /* IndexPage */]),
        ],
    })
], IndexPageModule);

//# sourceMappingURL=index.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndexPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase_analytics__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IndexPage = (function () {
    function IndexPage(firebaseAnalytics, navCtrl, navParams, geolocation, loadingCtrl) {
        this.firebaseAnalytics = firebaseAnalytics;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.travelMode = "DRIVING";
        this.start = "nice";
        this.destination = "nanterre";
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.located = false;
        this.latLng = new google.maps.LatLng(0.0, 0.0);
    }
    IndexPage.prototype.travelClick = function (type) {
        this.travelMode = type;
    };
    IndexPage.prototype.directionClick = function (event) {
        // Analytics
        this.firebaseAnalytics.logEvent('search', { 'travelMode': this.travelMode, 'start': this.start, 'end': this.destination })
            .then(function (res) { return console.log(res); })
            .catch(function (error) { return console.error(error); });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */], { 'start': this.start, 'end': this.destination, 'travelMode': this.travelMode, 'located': this.located, 'LatLng': this.latLng }, { animate: false, direction: 'forward', });
    };
    IndexPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IndexPage');
        //Analytics
        this.firebaseAnalytics.logEvent('page_view', { page: "lobby" })
            .then(function (res) { return console.log(res); })
            .catch(function (error) { return console.error(error); });
    };
    IndexPage.prototype.locateUserEnd = function () {
        var _this = this;
        this.loading(true);
        this.geolocation.getCurrentPosition().then(function (data) {
            console.log('My latitude : ', data.coords.latitude);
            console.log('My longitude: ', data.coords.longitude);
            _this.located = true;
            _this.latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            _this.destination = "Ma position";
            _this.loading(false);
        }).catch(function (error) {
            console.log('Error getting location', error);
            _this.loading(false);
        });
    };
    IndexPage.prototype.locateUserStart = function () {
        var _this = this;
        this.loading(true);
        this.geolocation.getCurrentPosition().then(function (data) {
            console.log('My latitude : ', data.coords.latitude);
            console.log('My longitude: ', data.coords.longitude);
            _this.located = true;
            _this.latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            _this.start = "Ma position";
            _this.loading(false);
        }).catch(function (error) {
            console.log('Error getting location', error);
            _this.loading(false);
        });
    };
    IndexPage.prototype.loading = function (on) {
        if (on) {
            this.loader.present();
        }
        else {
            this.loader.dismiss();
        }
    };
    return IndexPage;
}());
IndexPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'IndexPage',template:/*ion-inline-start:"/Users/arthurhatchiguian/Desktop/Epitech/mobile hybrid/mobileHybrid/src/pages/index/index.html"*/'<!--\n  Generated template for the IndexPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>index</ion-title>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">    \n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <div>\n        <div>\n          <ion-item class="start">\n              <ion-label fixed>Départ</ion-label>\n              <ion-input type="text" id="start" [(ngModel)]="start"></ion-input>\n              <button ion-button clear color="dark" type="button" item-right (click)="locateUserStart()">\n                  <ion-icon class="material-icons" item-right>my_location</ion-icon>\n              </button>\n          </ion-item>\n          <ion-item class="end">\n              <ion-label fixed>Arrivée</ion-label>\n              <ion-input type="text" id="end" [(ngModel)]="destination"></ion-input>\n              <button ion-button clear color="dark" type="button" item-right (click)="locateUserEnd()">\n                  <ion-icon class="material-icons" item-right>my_location</ion-icon>\n              </button>\n        </ion-item>\n      <ion-row >\n          <ion-col text-center>\n              <div class="btn-group" >\n                  <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'WALKING\')"><i class="material-icons">directions_walk</i></button>\n                  <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'BICYCLING\')"><i class="material-icons">directions_bike</i></button>\n                  <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'TRANSIT\')"><i class="material-icons">directions_transit</i></button>\n                  <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'DRIVING\')"><i class="material-icons">directions_car</i></button>\n              </div>     \n              <i class="material-icons" id="direction" (click)="directionClick($event)">directions</i>\n          </ion-col>\n        </ion-row>\n      </div>\n    </div>\n  <p>\n    selected: {{travelMode}}\n  </p>\n</ion-content>\n'/*ion-inline-end:"/Users/arthurhatchiguian/Desktop/Epitech/mobile hybrid/mobileHybrid/src/pages/index/index.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], IndexPage);

//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=0.js.map