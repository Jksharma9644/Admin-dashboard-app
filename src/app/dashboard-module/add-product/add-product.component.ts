import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../Services/products/products.service';
import { Router} from '@angular/router';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers:[ProductsService]
  
})
export class AddProductComponent implements OnInit {

// private fileReader:FileReader;
// private base64Encoded:string;
public image:any;
public msg:any="";
constructor(public _productService:ProductsService,public _router:Router) {
 }

ngOnInit() {
}
public rows =[
  {
    
  }
]

public request={
  product_type:0,
	product_name:"",
  product_price:0,
  images:[],
	description:"",
	default_qty:0,
	is_active:false,
  is_deleted:false,
  is_pending:false,
	created_by_id:""
}

AddProduct(){
console.log(this.request);
  if(this.request.product_type==0 || this.request.default_qty==0 ||this.request.product_price==0 || this.request.product_name=="" ||this.request.description==""){
   this.msg="No fileld should be Empty";
  }else{
    this._productService._addNewProduct(this.request).subscribe(res=>{
      console.log(res);
      if(res.error==false){
        this.msg ="";
        this._router.navigateByUrl('/Dashboard/Product/List'); 
      }
    })
  }

}

AddNewImageUploader(){
  this.image=[];
  var object={
  }
  this.rows.push(object);
}
changeListener($event,index) : void {
  this.readThis($event.target,index);
}

readThis(inputValue: any,index): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result.split(",");
    console.log(this.image)
    if(this.request.images[index]!==null){
    this.request.images.push(this.image[1]);
    }else{
      this.request.images = this.image[1];
    }
  }
  myReader.readAsDataURL(file);
}

}
