import { Component, OnInit } from '@angular/core';
import { AdminauthService } from '../service/adminauth.service';
import { Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AdminauthService]
})
export class LoginComponent implements OnInit {
  
  constructor(public _authService: AdminauthService,public _router:Router) { }
  public request = {
    email: "",
    password: ""
  }
  public msg:any="";
  public loading:any=false;
  public hideForm:any=false;

  Login(){
    this._authService.login(this.request).subscribe(res => {
      console.log(res);
      if(res.status){
        localStorage.setItem('currentUser', JSON.stringify({ userName: res.name,email: res.email,userId: res.user_id,token: res.token }));
       this._router.navigateByUrl('/Dashboard'); 
      }
      this.msg = "";
      this.HideMsg();
    })
  }
  ngOnInit() {
  }
  HideMsg(){
    setTimeout(() => {
      this.msg="";
      this.loading= false;
    },3000);
  }

}
