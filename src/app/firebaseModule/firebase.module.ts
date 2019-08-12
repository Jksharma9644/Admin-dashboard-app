import { NgModule, ModuleWithProviders} from '@angular/core';
import { FirebaseService } from './firebase.service';

@NgModule({})
export class FirebaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirebaseModule,
      providers: [FirebaseService ]
    };
  }
}