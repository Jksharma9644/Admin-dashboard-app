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
  public categotriestypes=[];
  public categories=[];
  public subcatgories=[];
  constructor(public _productService: ProductsService, public _router: Router, public _authService: AuthServiceService, public db: AngularFireDatabase) {
   
    this.request = new Product();
   
    if (localStorage.getItem('logindetails')) {
      this.loginDetails = JSON.parse(localStorage.getItem('logindetails'));
      this.request.CREATED_BY_ID = this.loginDetails.email || "";
      this.request.CREATED_BY_NAME = this.loginDetails.displayName || "";
      console.log(this.loginDetails);
    }    
  
   

  }

  ngOnInit() {
    this.getCategories();
  }
  public rows = [
    {

    }
  ]



  AddProduct() {
    
      this.request.images= this._authService.images;
      this._productService._addProduct(this.request).subscribe(data=>{
        if(data["status"]){
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
      })
      this._authService.images=[];
      // this.showAddBtn=true;
    
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

  getCategories(){
    this._productService._getCategoryList().subscribe(res=>{
      if(res["status"]){
        var data= res["data"];
        if(data.length>0)
        data.forEach(element => {
          this.categotriestypes.push(element);
        });
      }
    })
  }
  onTypeChange(TYPE){
    // console.log(this.categotriestypes);
    // this.ProductEditDetails.product_type=TYPE;
    var index =  this.categotriestypes.findIndex(a=>a.TYPE==TYPE);
    if(index>-1){
      this.categories= this.categotriestypes[index].CATEGORY;
      this.subcatgories= this.categotriestypes[index].SUBCATEGORY;
    }else{
      this.categories=[];
      this.subcatgories=[];
    }

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
  checkValue(event: any){
    // console.log(event,this.ProductEditDetails.ISACTIVE);
 }


}
