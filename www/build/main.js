webpackJsonp([2],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/home/home.module": [
		263,
		1
	],
	"../pages/index/index.module": [
		264,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 149;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_analytics__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, params, firebaseAnalytics, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.firebaseAnalytics = firebaseAnalytics;
        this.loadingCtrl = loadingCtrl;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.service = new google.maps.DistanceMatrixService();
        this.loader = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        //Analytics
        this.firebaseAnalytics.logEvent('page_view', { page: "detail" })
            .then(function (res) { return console.log(res); })
            .catch(function (error) { return console.error(error); });
        this.infoLabel = "test";
        this.start = params.get('start');
        this.end = params.get('end');
        this.travelMode = params.get('travelMode');
        this.calculateAndDisplayRoute();
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.initMap();
    };
    HomePage.prototype.initMap = function () {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: { lat: 46.3, lng: 2.22 },
            zoom: 4
        });
        this.directionsDisplay.setMap(this.map);
    };
    HomePage.prototype.calculateAndDisplayRoute = function () {
        var _this = this;
        this.loading(true);
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: this.travelMode
        }, function (response, status) {
            _this.loading(false);
            if (status == "OK") {
                _this.directionsDisplay.setDirections(response);
                _this.calculateDistanceAndTime();
            }
            else {
                _this.displayAlert('Erreur:' + status);
                _this.navCtrl.pop();
            }
        });
    };
    HomePage.prototype.calculateDistanceAndTime = function () {
        var _this = this;
        this.service.getDistanceMatrix({
            origins: [this.start],
            destinations: [this.end],
            travelMode: this.travelMode
        }, function (response, status) {
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
                        _this.displayAlert('Distance: ' + distance + ', durée du trajet: ' + duration);
                    }
                }
            }
            else {
                _this.displayAlert('Distance introuvable');
            }
        });
    };
    HomePage.prototype.displayAlert = function (text) {
        window.alert(text);
    };
    HomePage.prototype.loading = function (on) {
        if (on) {
            this.loader.present();
        }
        else {
            this.loader.dismiss();
        }
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('map'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], HomePage.prototype, "mapElement", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/arthurhatchiguian/Desktop/git mobile/mobileHybrid/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div>\n      <div id="floating-panel">\n          <ion-item>\n              <ion-label>Start Time</ion-label>\n          </ion-item>\n<!--\n        <ion-item class="start">\n            <ion-label fixed>Départ</ion-label>\n            <ion-input type="text" id="start" [(ngModel)]="start"></ion-input>\n            <button ion-button clear color="dark" type="button" item-right (click)="travelClick(\'DRIVING\')">\n                <ion-icon class="material-icons" item-right>my_location</ion-icon>\n            </button>\n        </ion-item>\n        <ion-item class="end">\n            <ion-label fixed>Arrivée</ion-label>\n            <ion-input type="text" id="end" [(ngModel)]="end"></ion-input>\n            <button ion-button clear color="dark" type="button" item-right (click)="travelClick(\'DRIVING\')">\n                <ion-icon class="material-icons" item-right>my_location</ion-icon>\n            </button>\n      </ion-item>\n    <ion-row >\n        <ion-col text-center>\n            <div class="btn-group" >\n                <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'WALKING\')"><i class="material-icons">directions_walk</i></button>\n                <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'BICYCLING\')"><i class="material-icons">directions_bike</i></button>\n                <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'TRANSIT\')"><i class="material-icons">directions_transit</i></button>\n                <button ion-button class="btn btn-primary" value="walk" (click)="travelClick(\'DRIVING\')"><i class="material-icons">directions_car</i></button>\n            </div>     \n            <i class="material-icons" id="direction" (click)="buttonClick($event)">directions</i>\n        </ion-col>\n      </ion-row>\n-->\n    </div>\n  </div>\n    <div #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/arthurhatchiguian/Desktop/git mobile/mobileHybrid/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]) === "function" && _e || Object])
], HomePage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(213);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase_analytics__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/index/index.module#IndexPageModule', name: 'IndexPage', segment: 'index', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_firebase_analytics__["a" /* FirebaseAnalytics */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = 'IndexPage';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/arthurhatchiguian/Desktop/git mobile/mobileHybrid/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/arthurhatchiguian/Desktop/git mobile/mobileHybrid/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map