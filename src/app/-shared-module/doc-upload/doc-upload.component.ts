import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UploadService } from '../upload/upload.service';
import { FileUpload } from '../../models/upload';
import { Observable } from '@firebase/util';


@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss'],
  providers: [UploadService]
})
export class DocUploadComponent implements OnInit {
  item: number = 0;
  subscription: any;
  @Output() File: EventEmitter<any> = new EventEmitter<any>();
  
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  filesRef:Observable<any>;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }
  selectedNavItem(item: number) {
    this.item = item;
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  selectFile(event){
    this.selectedFiles = event.target.files;

  }
  upload(){
    const file =  this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload,this.progress)
    this.subscription = this.uploadService.getNavChangeEmitter()
    .subscribe(item=>this.File.emit(item));
  
  }

}
