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
import * as firebase from 'firebase/app';
import { parse } from 'querystring';
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
  itemsRef: AngularFireList<any>;

  constructor(public _productService: ProductsService, private activeroute: ActivatedRoute, private modalService: BsModalService, public _authService: AuthServiceService, public db: AngularFireDatabase, public _sharedService: SharedService, public router: Router) {
    this.ProductEditDetails = this._sharedService.EditDetails;
    this.loginDetails = this._authService.loginDetails;
    this.itemsRef = db.list('myProducts');
    this.activeroute.params.subscribe(params => {
      
      this.productid = params.id;
    })
  }

  ngOnInit() {
    if(this._sharedService.EditDetails){
    }else{
      // console.log(this._sharedService.EditDetails )
      this._productService._getProductById(this.productid).subscribe(res => {
        console.log(res)
        this.ProductEditDetails = res["data"];
      })
    }
      

  }

  EditProduct() {
    var images = this._authService.images;
    // console.log(images);
    if (this.ProductEditDetails.images) {
      this.ProductEditDetails.images = this.ProductEditDetails.images.concat(images)
    } else {
      this.ProductEditDetails.images = images;
    }

    this.ProductEditDetails.last_updated = new Date().getTime();
    this.itemsRef.update(this.ProductEditDetails.productId, this.ProductEditDetails);
    this.showAddBtn = true;
    this._authService.images = [];

  }
  getProductById() {
    this._productService
  }
  eraseImage(index) {
    this.ProductEditDetails.images.splice(index, 1);
  }

}
