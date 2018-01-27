import { NgModule,ModuleWithProviders} from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
// import { Authervice} from './AuthService/_auth.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReactiveFormComponent],
  exports:[]
})
export class SharedModuleModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModuleModule,
      // providers: [Authervice]
      
    };
  }
}
