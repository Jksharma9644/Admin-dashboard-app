import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../-shared-module/sharedServices/shared.service'
import { ProductsService } from '../Services/products/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  providers: [ProductsService]
})
export class EditCategoryComponent implements OnInit {
  public CategoryEditDetails: any;
  public catid: any;
  public CategoryForm: FormGroup;
  public editreq={
    id:"",
    body:null
  }
  constructor(private fb: FormBuilder, private activeroute: ActivatedRoute, public _productService: ProductsService, public sharedService: SharedService) {
    this.activeroute.params.subscribe(params => {

      this.catid = params.id;
    })
  }

  ngOnInit() {
    this.CategoryForm = this.fb.group({
      ID:"",
      type: "",
      category: this.fb.array([])
    })


    if (this.sharedService.EditDetails) {
      this.CategoryEditDetails = this.sharedService.CategoryDetails;
      this.patchForm();
    } else {
      // console.log(this._sharedService.EditDetails )
      this._productService._getCategoryById(this.catid).subscribe(res => {
        console.log(res)
        this.CategoryEditDetails = res["data"];
        this.patchForm();
      })
    }
  }

  patchForm(){
    this.CategoryForm.patchValue({
      type:this.CategoryEditDetails.TYPE,
      ID:this.CategoryEditDetails.ID
     
    })
    this.setSubcategories();
  }

  setSubcategories(){
    let control = <FormArray>this.CategoryForm.controls.category;
    this.CategoryEditDetails.CATEGORY.forEach(x => {
      control.push(this.fb.group({name: x.name,value:x.value }))
    });


  }

  EditCategory(){
    this.editreq.id= this.CategoryEditDetails.ID;
    this.editreq.body=this.CategoryForm.value;
    this._productService._editCategory(this.editreq).subscribe(res=>{
     console.log(res)
    })
  }
  

}
