import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from '../Services/products/products.service';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';



@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  providers: [ProductsService]
})
export class ProductCategoryComponent implements OnInit {
  orderForm: FormGroup;
  items: FormArray;
  itemsRef: AngularFireList<any>;
  itemsList: Observable<any[]>;


  constructor(private _productService: ProductsService, private fb: FormBuilder, public db: AngularFireDatabase) {
    this.itemsRef = db.list('productsCategories');
    this.itemsList = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      ID:"CAT"+new Date().getMilliseconds(),
      TYPE: '',
      CATEGORY: this.fb.array([])
    })
  }
  ngAfterViewInit() {
    // this.createType();
  }
  resetForm(){
    const arr = <FormArray>this.orderForm.controls.CATEGORY
    arr.controls = [];
    this.orderForm.reset();
  }
  createType() {
    this.orderForm = this.fb.group({
      ID:"CAT"+new Date().getMilliseconds(),
      TYPE: '',
      CATEGORY: this.fb.array([])
    })
    // console.log(this.orderForm);

  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      value: '',
    });
  }
  addcategory(): void {

    // <FormArray>this.orderForm.get('category').p ;
    this.items = this.orderForm.get('CATEGORY') as FormArray;
    this.items.push(this.createItem());
    //  console.log(this.items);
    this.orderForm.controls.CATEGORY = this.items;

  }
  deletecategory(index) {
    this.items = this.orderForm.get('CATEGORY') as FormArray;
    this.items.removeAt(index);

  }
  // this.orderForm.controls.category=this.formBuilder.array([this.createItem()])
  // this.items = this.orderForm.get('category') as FormArray;
  // this.items.push(this.createItem());
  onSubmit() {
    // console.log(this.orderForm.value);
    this._productService._addCategories(this.orderForm.value).subscribe(res => {
      console.log(res);
      if (res["status"]) {
        this.resetForm();
        var x = document.getElementById("new_cat");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); 
      
        
      }, 3000);
      }
    })
    //   this.itemsRef.push(this.orderForm.value);
    // }
  }
}




