import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class AdminauthService {
public headers:any;
public baseURl:any;
constructor(public http: Http) { 
  this.baseURl ='http://localhost:3000/';
}
  
SignUp(req){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, method: "post" });
  let body = JSON.stringify(req);
  return this.http.post(this.baseURl+'auth/regitser', body, options)
    .map(this.extractData)
    .catch(this.handleError);
}

login(req){
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers, method: "post" });
  let body = JSON.stringify(req);
  return this.http.post(this.baseURl+'auth/sign_in', body, options)
    .map(this.extractData)
    .catch(this.handleError);
}


private extractData(res: Response) {
  let body = res.json();
  return body;
}




private handleError(error: Response | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}



}
