import { NgModule } from '@angular/core';
import { HomePage} from './home';
import { IonicPageModule } from 'ionic-angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage)],
  entryComponents: [HomePage],
   providers: [
   FirebaseAnalytics
  ]
})

export class HomePageModule { }