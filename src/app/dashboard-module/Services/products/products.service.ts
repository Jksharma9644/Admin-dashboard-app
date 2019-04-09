import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {
  public headers: any;
  public baseURl: any;

  constructor(public http: HttpClient) {
    this.baseURl = 'https://arcane-mesa-86746.herokuapp.com/';
  }

  _getAllProducts() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "get" });
    return this.http.get(this.baseURl + 'productlist/admin')

  } 
  _getProductById(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "get" });
    return this.http.get(this.baseURl + 'product/'+id);
  }
  _editProduct(req){
    return this.http.put(this.baseURl + 'product/update/'+req.id,req.body);
  
  }
  _addCategories(req){
    return this.http.post(this.baseURl + 'addcategories',req);
  
  }
  _getCategoryList(){
    return this.http.get(this.baseURl + 'categoryList');
  }
  _getCategoryById(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "get" });
    return this.http.get(this.baseURl + 'category/'+id);
  }
  _editCategory(req){
    return this.http.put(this.baseURl + 'category/update/'+req.id,req.body);
  
  }
  _removeCategory(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "get" });
    return this.http.get(this.baseURl + 'category/remove/'+id);
  }
  // _addNewProduct(req){
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers, method: "post" });
  //   let body = JSON.stringify(req);
  //   return this.http.post(this.baseURl + 'product/add',body,options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  
}
