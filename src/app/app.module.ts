import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing} from './app.routing';
// import { UserModuleModule} from './user-module/user-module.module';
import {SharedModuleModule} from'./-shared-module/-shared-module.module';
import { AppComponent } from './app.component';
import { CommonModule} from'@angular/common';
import { BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { SidebarComponent} from './sidebar/sidebar.component';
import { SidebarNavComponent} from './sidebar-nav/sidebar-nav.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap';
//firebase

//firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarNavComponent
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    routing,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SharedModuleModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
