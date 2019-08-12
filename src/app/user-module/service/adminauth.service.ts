import { Injectable } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';


@Injectable()
export class AdminauthService {
public headers:any;
public baseURl:any;
public currentUser: any;

private user: Observable<firebase.User>;
private userDetails: firebase.User = null;
constructor(private firebaseAuth: AngularFireAuth, private http: Http, private _router: Router,public auth:AuthServiceService) { 
  // this.baseURl ='http://localhost:3000/';
  // if (localStorage.getItem('currentUser')) {
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  this.user = firebaseAuth.authState;
  this.user.subscribe(
          (user) => {
            if (user) {
              this.userDetails = user;
              localStorage.setItem('logindetails', JSON.stringify( this.userDetails));
           
              console.log(this.userDetails);
              this.auth.loginDetails= this.userDetails;
              this._router.navigate(['/Dashboard/Product/List'])
            }
            else {
              this.userDetails = null;
              // this._router.navigate(['/login'])
            }
          }
        );
  // }    
}



// firebase API's

signup(email: string, password: string) {
  this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Success!', value);
      this._router.navigate(['/login'])
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
    });
}

signInRegular(email: string, password: string) {
  this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      localStorage.setItem('currentUser', JSON.stringify(this.userDetails));
      this._router.navigate(['/Dashboard/Product/List'])
    })
    .catch(err => {
      console.log('Something went wrong:', err.message);
    });
}


logout() {
  this.firebaseAuth.auth.signOut()
    .then((res) => 
    {  
      localStorage.removeItem('logindetails');
      this._router.navigate(['/login']);
     
    }
    
  );
}

signInWithFacebook() {
  return this.firebaseAuth.auth.signInWithPopup(
    new firebase.auth.FacebookAuthProvider()
  )
}
signInWithGoogle() {
  return this.firebaseAuth.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
  )
}
isLoggedIn() {
  if (this.userDetails == null|| this.userDetails==undefined) {
    return false;
  } else {
    return true;
  }
}
  
// SignUp(req){
//   let headers = new Headers({ 'Content-Type': 'application/json' });
//   let options = new RequestOptions({ headers: headers, method: "post" });
//   let body = JSON.stringify(req);
//   return this.http.post(this.baseURl+'auth/admin/regitser', body, options)
//     .map(this.extractData)
//     .catch(this.handleError);
// }

// login(req){
//   let headers = new Headers({ 'Content-Type': 'application/json' });
//   let options = new RequestOptions({ headers: headers, method: "post" });
//   let body = JSON.stringify(req);
//   return this.http.post(this.baseURl+'auth/admin/sign_in', body, options)
//     .map(this.extractData)
//     .catch(this.handleError);
// }


// private extractData(res: Response) {
//   let body = res.json();
//   return body;
// }




// private handleError(error: Response | any) {

//   let errMsg: string;
//   if (error instanceof Response) {
//     const body = error.json() || '';
//     const err = body.error || JSON.stringify(body);
//     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//   } else {
//     errMsg = error.message ? error.message : error.toString();
//   }
//   console.error(errMsg);
//   return Observable.throw(errMsg);
// }



}
