import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IndexPage } from '../pages/index';

declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'IndexPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
        FCMPlugin.getToken(
          (t) => {
            console.log(t);
          },
          (e) => {
            console.log(e);
          }
        );

        FCMPlugin.onNotification(
          (data) => {
            console.log(data);
          },
          (e) => {
            console.log(e);
          }
        );
    });
  }
}

