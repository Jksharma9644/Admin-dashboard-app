import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../-shared-module/sharedServices/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { ProductsService} from '../Services/products/products.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService } from '../../-shared-module/AuthService/auth-service.service';
import { Observable } from 'rxjs/Observable';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { ProductsService } from '../Services/products/products.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [ProductsService]
})
export class EditProductComponent implements OnInit {
  public ProductEditDetails: any;
  public loginDetails: any;
  public ProductsList: any;
  public showAddBtn: any = false;
  public productid: any;
  public editreq={
    id:"",
    body:null
  }
  itemsRef: AngularFireList<any>;
  msg="";

  public categotriestypes=[];
  public categories=[];
  public subcatgories=[];

  constructor(public _productService: ProductsService, private activeroute: ActivatedRoute, private modalService: BsModalService, public _authService: AuthServiceService, public db: AngularFireDatabase, public _sharedService: SharedService, public router: Router) {
    this.ProductEditDetails = this._sharedService.EditDetails;
    this.loginDetails = this._authService.loginDetails;
    this.itemsRef = db.list('myProducts');
    this.activeroute.params.subscribe(params => {
      
      this.productid = params.id;
    })
  }

  ngOnInit() {
    this.msg="";
    if(this._sharedService.EditDetails){
      this.getCategories();
      this.ProductEditDetails.product_type="Select";
      this.ProductEditDetails.category_type="Select"
    }else{
      // console.log(this._sharedService.EditDetails )
      this._productService._getProductById(this.productid).subscribe(res => {
        console.log(res)
        this.ProductEditDetails = res["data"];
        this.ProductEditDetails.product_type="Select";
        this.ProductEditDetails.category_type="Select"
        this.getCategories();
      })
    }
      

  }

  getCategories(){
    this._productService._getCategoryList().subscribe(res=>{
      if(res["status"]){
        var data= res["data"];
        if(data.length>0)
        data.forEach(element => {
          this.categotriestypes.push(element);
        });
        // this.categories=data;
      }
     
      

    })
  }
  onTypeChange(TYPE){
    // this.ProductEditDetails.product_type=TYPE;
    var index =  this.categotriestypes.findIndex(a=>a.TYPE==TYPE);
    if(index>-1){
      this.categories= this.categotriestypes[index].CATEGORY;
    }else{
      this.categories=[];
    }

  }
  onCategoryChange(){}

  EditProduct() {
    this.msg="";
    var images = this._authService.images;
    // console.log(images);
    if (this.ProductEditDetails.images) {
      this.ProductEditDetails.images = this.ProductEditDetails.images.concat(images)
    } else {
      this.ProductEditDetails.images = images;
    }

    this.ProductEditDetails.last_updated = new Date().getTime();
    this.editreq.id=  this.productid;
    this.editreq.body=this.ProductEditDetails;
    this._productService._editProduct( this.editreq).subscribe(res=>{
      console.log(res);
      if(res["status"]){
      this.msg=res["message"];
      this.showAddBtn = true;
      this._authService.images = [];
  
      }

    })
    // this.itemsRef.update(this.ProductEditDetails.productId, this.ProductEditDetails);
    
    

  }
  getProductById() {
    this._productService
  }
  eraseImage(index) {
    this.ProductEditDetails.images.splice(index, 1);
  }

}
