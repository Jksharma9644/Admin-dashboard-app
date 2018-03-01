import { Component, OnInit } from '@angular/core';
// import { AdminauthService } from '../service/adminauth.service';
import { Router } from '@angular/router';
import { AdminauthService } from '../service/adminauth.service';
import {AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AdminauthService]
})
export class LoginComponent implements OnInit {

  constructor(public _adminauthService: AdminauthService, public _router: Router,public authService:AuthServiceService) { }
  public request = {
    email: "",
    password: ""
  }
  public msg: any = "";
  public loading: any = false;
  public hideForm: any = false;

  // Login(){
  //   this._authService.login(this.request).subscribe(res => {
  //     console.log(res);
  //     if(res.status){
  //     localStorage.setItem('loginDetails', JSON.stringify({ userName: res.name,email: res.email,userId: res.user_id,token: res.token }));
  //      this._authService.loginDetails= { userName: res.name,email: res.email,userId: res.user_id,token: res.token };
  //       this._router.navigateByUrl('/Dashboard'); 
  //     }
  //     this.msg = "";
  //     this.HideMsg();
  //   })
  // }
  ngOnInit() {
  }



  signInWithEmail() {
    this._adminauthService.signInRegular(this.request.email, this.request.password);
  }

  signInWithFacebook() {
    this._adminauthService.signInWithFacebook()
    .then((res) => { 
        this._router.navigate(['/Dashboard/Product/List'])
      })
    .catch((err) => console.log(err));
  }

   // signin with Google

  signInWithGoogle(){
    this._adminauthService.signInWithGoogle()
    .then((res) => { 
      console.log(res);
        this._router.navigate(['/Dashboard/Product/List'])
      })
    .catch((err) => console.log(err));
  }
  HideMsg() {
    setTimeout(() => {
      this.msg = "";
      this.loading = false;
    }, 3000);
  }

}
