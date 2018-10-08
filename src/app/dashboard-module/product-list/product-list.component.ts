import { Component, OnInit ,ViewChild,Renderer,ElementRef,ContentChildren,TemplateRef } from '@angular/core';
import { ProductsService} from '../Services/products/products.service';
import { Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';
import { Observable } from 'rxjs/Observable';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { parse } from 'querystring';
import {SharedService} from '../../-shared-module/sharedServices/shared.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers:[ProductsService,AuthServiceService]
})
export class ProductListComponent implements OnInit {
public Products =[];
modalRef: BsModalRef;
public loginDetails:any;
public ProductsList=[]
public loading=false;
itemsRef: AngularFireList<any>;
items: Observable<any[]>; 
image:any;
Images=[];
config = {
  animated: true,
  keyboard: true,
  backdrop: true,
  ignoreBackdropClick: false
};
public Product_type =[
  {
    value:1,
    label:"Electronics"
  },
  {
    value:2,
    label:"Cloths"
  },
  {
    value:3,
    label:"Shoes"
  }]
constructor(public _productService:ProductsService,public _router:Router,private modalService: BsModalService,public _authService:AuthServiceService,public db: AngularFireDatabase,public _sharedService:SharedService,public router:Router) { 
  this.loginDetails = this._authService.loginDetails;
  this.itemsRef = db.list('myProducts');
  this.items = this.itemsRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });
}
 
ngOnInit() {
  this.getProductList();
}

getProductType(type){
  // console.log(type);
  
  var index = this.Product_type.findIndex(x => x.value==type);
  if(index!==-1){
    var product_type = this.Product_type[index].label;
    return product_type;
  }else{
    return "null";
  }
  
}
openModal(template: TemplateRef<any>,item) {
  console.log(item);
  this.modalRef = this.modalService.show(template, this.config);
  this.Images= item.images;
  if(item.images){
    this.image = item.images[0].url;
  }
  
  console.log(this.image);
}
delete(key){
  this.itemsRef.remove(key); 
  
}
edit(object){
  
 this._sharedService.EditDetails=object;
 this.router.navigateByUrl('/Dashboard/Product/edit/'+object.PRODUCT_ID);
  // this.itemsRef.update(key,{"product_name":"toys"});
}



getProductList(){
  this._productService._getAllProducts().subscribe(res=>{
       if(res["status"]){
        this.ProductsList=res["data"];

       }
  })
 
}

}
