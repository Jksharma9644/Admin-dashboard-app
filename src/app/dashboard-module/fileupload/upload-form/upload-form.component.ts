import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UploadService } from '../upload.service';
import { Upload } from '../upload';
import * as _ from 'lodash'


@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  providers:[UploadService]
})
export class UploadFormComponent {

  @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }
  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
      // this.fileUploaded.emit(file);
      this.upSvc.getNavChangeEmitter().subscribe(item=>{
         this.fileUploaded.emit(item);
      })
    }
    )
  }
  

}
