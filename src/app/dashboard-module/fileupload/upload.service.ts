import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from './upload';
import * as firebase from 'firebase';
import {AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';

@Injectable()
export class UploadService {
  navchange: EventEmitter<any> = new EventEmitter();

  private basePath: string = '/uploads';
  uploads: FirebaseListObservable<Upload[]>;
  subscription: any;

  


  constructor(private db: AngularFireDatabase,public _sharedService:AuthServiceService) {}
  pushUpload(upload: Upload) {

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      const snap = snapshot as firebase.storage.UploadTaskSnapshot

      upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
    }, (error) => {
      // console.log(error)
    }, () => {

      upload.url = uploadTask.snapshot.downloadURL;
      upload.name = upload.file.name;
      // console.log(upload)
      this._sharedService.images.push(upload);
      this._sharedService.totalImageCount= ++this._sharedService.totalImageCount;
         this.navchange.emit(upload);
    })

  }
  deleteUpload(upload: Upload) {

  }
  getNavChangeEmitter() {
    return this.navchange;
  }

}
