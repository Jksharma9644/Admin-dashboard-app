import { NgModule,ModuleWithProviders} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import {AuthServiceService} from './AuthService/auth-service.service';
import {AuthGuard } from '../_guard/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ReactiveFormComponent],
  exports:[ReactiveFormComponent]
})
export class SharedModuleModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      providers: [AuthGuard,AuthServiceService]
      
    };
  }
}
