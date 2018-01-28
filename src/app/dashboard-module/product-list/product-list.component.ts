import { Component, OnInit ,ViewChild,Renderer,ElementRef,ContentChildren,TemplateRef } from '@angular/core';
import { ProductsService} from '../Services/products/products.service';
import { Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers:[ProductsService]
})
export class ProductListComponent implements OnInit {
public Products =[];
modalRef: BsModalRef;
image:any;
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
constructor(public _productService:ProductsService,public _router:Router,private modalService: BsModalService) { }
 
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
  this.modalRef = this.modalService.show(template, this.config);
  this.image =item.images[0];
}



getProductList(){
  this._productService._getAllProducts().subscribe(res => {
    if(res.message=='success'){
      this.Products =res.data;
      console.log( this.Products);
    }
   
  })
}

}
