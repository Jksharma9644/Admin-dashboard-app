import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileUpload } from '../../models/upload';
import * as firebase from 'firebase';
import {AuthServiceService} from '../AuthService/auth-service.service';

@Injectable()
export class UploadService {
  navchange: EventEmitter<any> = new EventEmitter();



  public storageRef = firebase.storage().ref();
  public count=0;
  constructor(private db: AngularFireDatabase,public _sharedService:AuthServiceService) {
  }

  private basePath = '/uploads';

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

      },
      (error) => {
        //fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this._sharedService.images.push(fileUpload);
        this._sharedService.totalImageCount= ++this.count;
        // this.saveFileData(fileUpload);
        // this.navchange.emit(fileUpload);
        // return fileUpload;
      }
    );

  }
  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }
  getNavChangeEmitter() {
    return this.navchange;
  }
}
