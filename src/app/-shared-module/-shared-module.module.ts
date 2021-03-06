import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AuthServiceService } from './AuthService/auth-service.service';
import { AuthGuard } from '../_guard/auth.guard';
import { DocUploadComponent } from './doc-upload/doc-upload.component';
import { UploadTaskComponent } from './upload-task/upload-task.component'
import { UploadService } from './upload/upload.service';
import { SharedService } from './sharedServices/shared.service';
import { DropzoneDirective } from '../directives/dropzone.directive';
import { FileSizePipe } from '../pipe/file-size.pipe';
import { UploaderListComponent } from './uploader-list/uploader-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [  DropzoneDirective,
    FileSizePipe,ReactiveFormComponent, DocUploadComponent,UploaderListComponent, UploadTaskComponent],
  exports: [  DropzoneDirective,
    FileSizePipe,ReactiveFormComponent, DocUploadComponent,UploaderListComponent, UploadTaskComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModuleModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: [SharedService, AuthGuard, AuthServiceService]

    };
  }
}
