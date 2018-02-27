import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
declare var firebase:any;

@Injectable()
export class FirebaseService {
 public app:any;
    constructor(private af:AngularFireDatabase) {
        var config = {
            apiKey: "AIzaSyDKUcbHvI4C1fMfP8wzB_Wn-fR-BwQ9hJ4",
            authDomain: "oms-auat.firebaseapp.com",
            databaseURL: "https://oms-auat.firebaseio.com",
            projectId: "oms-auat",
            storageBucket: "oms-auat.appspot.com",
            messagingSenderId: "118810988506"
          };
    this.app = firebase.initializeApp(config,"firebaseapp");
  } 
}


