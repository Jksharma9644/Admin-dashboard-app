import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products/products.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService } from '../../-shared-module/AuthService/auth-service.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Product } from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductsService, AuthServiceService]

})
export class AddProductComponent implements OnInit {
  public image: any;
  public msg: any = "";
  public request: any;
  loginDetails: any;
  public loading: any = false;
  public i:any=0;

  public ProductsList: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  public showAddBtn:any=false;
  constructor(public _productService: ProductsService, public _router: Router, public _authService: AuthServiceService, public db: AngularFireDatabase) {
    this.loginDetails = this._authService.loginDetails;
    console.log(JSON.stringify(this.loginDetails));
    this.itemsRef = db.list('Products');
    this.request = new Product();
    this.request.created_by_id = this.loginDetails.userId || "";
    this.request.created_by_name = this.loginDetails.userName || "";

  }

  ngOnInit() {
  }
  public rows = [
    {

    }
  ]



  AddProduct() {
    if (this.request.product_type == 0 || this.request.default_qty == 0 || this.request.product_price == 0 || this.request.product_name == "" || this.request.description == "") {
      this.msg = "No fileld should be Empty";
      this.HideMsg();
    } else {
      // write into firebase
      // alert(JSON.stringify(this._authService.images));
      // get images from firebase storage;
      this.request.images= this._authService.images;
      // this.itemsRef.set(''+this.i,this.request);
      this.request.created_date= new Date().getTime();
      this.request.last_updated =new Date().getTime();
      this.request.product_id="";
      console.log(this.request)
      var PostId = this.itemsRef.push(this.request);
      this.request.product_id= PostId.key;
      this.itemsRef.update(PostId.key,this.request);
      this._authService.images=[];
      this.showAddBtn=true;
    }
  }

  AddNewImageUploader() {
    this.image = [];
    var object = {
    }
    this.rows.push(object);
  }
  changeListener($event, index): void {
    this.readThis($event.target, index);
  }

  readThis(inputValue: any, index): void {
    var file: File = inputValue.files[0];
    console.log(file);

    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result.split(",");
      // console.log(this.image)
      if (this.request.images[index] !== null) {
        this.request.images.push(this.image[1]);
      } else {
        this.request.images = this.image[1];
      }
    }
    myReader.readAsDataURL(file);

  }
  HideMsg() {
    setTimeout(() => {
      this.msg = "";
      this.loading = false;
    }, 3000);
  }
  UplaodEvent(event){
  alert(event);
  }
  eraseImage(index){
    this._authService.images.splice(index,1);
    --this._authService.totalImageCount;
  }

}
