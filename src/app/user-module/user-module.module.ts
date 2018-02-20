import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { routing} from './user.routes';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SharedModuleModule} from '../-shared-module/-shared-module.module';
import { AdminauthService} from './service/adminauth.service';
import { HttpModule}    from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule.forRoot(),
    HttpModule,
    routing
  ],
  declarations: [LoginComponent, RegisterComponent,UserComponent],
  providers:[]
})
export class UserModuleModule { }
