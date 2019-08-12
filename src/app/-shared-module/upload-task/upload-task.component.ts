import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap, finalize } from 'rxjs/operators';

import { AuthServiceService } from '../AuthService/auth-service.service'
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;


  // State for dropzone CSS toggling
  isHovering: boolean;
  files=[];
  index = 0;
  private basePath = '/uploads';


  constructor(private storage: AngularFireStorage, public authService: AuthServiceService) { }

  ngOnInit() {
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {

    // The File object
    const file = event.item(0);
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
    // The storage path
    const path = `uploads/${new Date().getTime()}_${file.name}`;
    const ref = this.storage.ref(path);

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };


    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // // Update firestore on completion
          // alert('completed');
        }
      })
    )
    // The file's download URL
    this.downloadURL = this.task.downloadURL();



  }
  // Determines if the upload task is active


  drop(file: FileList) {
    var path = `uploads/${new Date().getTime()}_${file[0].name}`;
    var ref = this.storage.ref(path);
    var task = this.storage.upload(path, file.item(this.index));
    var percentage = task.percentageChanges();
    var snapshot = task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
       var downloadURL = await  ref.getDownloadURL().toPromise();

        console.log(downloadURL);
      }),

    )
    var obj={
      path:path,
      ref:ref,
      task:task,
      percentage:percentage,
      snapshot:snapshot,

    }

    this.index += 1;
    this.files.push(obj);
  }

  startUploading(file) {
    // The storage path

    var obj = Object.assign({}, file);
    file.path = `uploads/${new Date().getTime()}_${file[0].name}`;
    file.ref = this.storage.ref(file.path);
    file.task = this.storage.upload(file.path, obj);
    file.percentage = file.task.percentageChanges();

    file.snapshot = file.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        file.downloadURL = await file.ref.getDownloadURL().toPromise();

        console.log(file.downloadURL)
      }),

    )
    this.files.push(file);

  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
