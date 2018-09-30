import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  orderForm: FormGroup;
  items: FormArray;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.orderForm = this.formBuilder.group({})
     

  }
  createType(){
    this.orderForm = this.fb.group({
      type: '',
      category: this.fb.array([  ])
    })
    console.log(this.orderForm);
    
  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      value: '',
    });
  }
  addcategory(): void {

    // <FormArray>this.orderForm.get('category').p ;
    this.items=this.orderForm.get('category') as FormArray;
     this.items.push(this.createItem());
     console.log(this.items);
     this.orderForm.controls.category=this.items;

  }
  deletecategory(index){
    this.items=this.orderForm.get('category') as FormArray;
    this.items.removeAt(index);
    
  }
    // this.orderForm.controls.category=this.formBuilder.array([this.createItem()])
    // this.items = this.orderForm.get('category') as FormArray;
    // this.items.push(this.createItem());
    onSubmit(){
    console.log("sas")
    }
  }
 
 


