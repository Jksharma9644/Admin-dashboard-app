import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import {AuthServiceService} from '../AuthService/auth-service.service';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  private basePath = '/uploads';


  constructor(private storage: AngularFireStorage, public authService:AuthServiceService) { }

  ngOnInit() {
    this.startUpload();
  }
  startUpload() {
    const path =`${this.basePath}/${Date.now()}/${this.file.name}`;
    const ref =this.storage.ref(path);
    this.task= this.storage.upload(path,this.file);
   


    //progress monitoring 
    this.percentage= this.task.percentageChanges();
    this.snapshot= this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async()=>{
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.authService.images.push({url: this.downloadURL,name:this.file.name})
      })
    )

  }
  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
