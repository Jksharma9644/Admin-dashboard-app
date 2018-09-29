import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../-shared-module/sharedServices/shared.service';
import { Router} from '@angular/router';
// import { ProductsService} from '../Services/products/products.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';
import { Observable } from 'rxjs/Observable';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { parse } from 'querystring';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
public ProductEditDetails:any={};
public loginDetails:any;
public ProductsList:any;
public showAddBtn:any=false;
itemsRef: AngularFireList<any>;

constructor(private modalService: BsModalService,public _authService:AuthServiceService,public db: AngularFireDatabase,public _sharedService:SharedService,public router:Router) { 
this.ProductEditDetails= this._sharedService.EditDetails;
this.loginDetails = this._authService.loginDetails;
this.itemsRef = db.list('myProducts');
}

  ngOnInit() {
  }

  EditProduct(){
    var images = this._authService.images;
    this.ProductEditDetails.images= this.ProductEditDetails.images.concat(images);
    this.ProductEditDetails.last_updated= new Date().getTime();
      this.itemsRef.update(this.ProductEditDetails.product_id,this.ProductEditDetails);
      this.showAddBtn=true;
      this._authService.images=[];

  }
  eraseImage(index){
    this.ProductEditDetails.images.splice(index,1);
  }

}
