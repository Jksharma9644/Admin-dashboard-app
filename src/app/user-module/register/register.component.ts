import { Component, OnInit } from '@angular/core';
import { AdminauthService } from '../service/adminauth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AdminauthService]

})
export class RegisterComponent implements OnInit {

  public request = {
    name: "",
    email: "",
    password: ""
  }
  public msg = "";
  // public formSubmitted:any=false;
  public repeat_password: "";
  public loading:any=false;
  public hideForm:any=false;
  
  constructor(public _authService: AdminauthService) { }

  ngOnInit() {
  }


  login(){

  }

  signup() {
    this.msg="";
    if (this.request.email == "" || this.request.name == "" || this.request.password == "") {
      this.msg = "No field should be empty";
      this.HideMsg();
    }else{
      this.loading= true;
      if (this.repeat_password === this.request.password ) {
        this._authService.SignUp(this.request).subscribe(res => {
          console.log(res);
          this.loading= false;
          this.hideForm=true;
          this.msg = "You have been registered";
          this.HideMsg();
        })
      }
      else {
        this.loading= false;
        this.msg = 'Password and confirm password should match';
         this.HideMsg();
      }
    }
  }
  HideMsg(){
    setTimeout(() => {
      this.msg="";
      this.loading= false;
    },3000);
  }

}
