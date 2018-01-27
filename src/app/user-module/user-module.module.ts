import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routing} from './user.routes';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [LoginComponent, RegisterComponent,UserComponent]
})
export class UserModuleModule { }
