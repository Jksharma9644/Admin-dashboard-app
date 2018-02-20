import { NgModule,ModuleWithProviders} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AuthServiceService} from './AuthService/auth-service.service';
import { AuthGuard } from '../_guard/auth.guard';
import { DocUploadComponent} from './doc-upload/doc-upload.component';
import { UploadService} from './upload/upload.service';
import { SharedService} from'./sharedServices/shared.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ReactiveFormComponent,DocUploadComponent],
  exports:[ReactiveFormComponent,DocUploadComponent]
})
export class SharedModuleModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: [SharedService,AuthGuard,AuthServiceService]
      
    };
  }
}
