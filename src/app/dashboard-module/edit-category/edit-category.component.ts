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
  public items: FormArray;

  public editreq = {
    id: "",
    body: null
  }
  constructor(private fb: FormBuilder, private activeroute: ActivatedRoute, public _productService: ProductsService, public sharedService: SharedService) {
    this.activeroute.params.subscribe(params => {

      this.catid = params.id;
    })
  }

  ngOnInit() {
    this.CategoryForm = this.fb.group({
      ID: "",
      TYPE: "",
      CATEGORY: this.fb.array([]),
      ISDELETED: false
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

  patchForm() {
    this.CategoryForm.patchValue({
      TYPE: this.CategoryEditDetails.TYPE,
      ID: this.CategoryEditDetails._id

    })
    this.setSubcategories();
  }

  setSubcategories() {
    let control = <FormArray>this.CategoryForm.controls.CATEGORY;
    this.CategoryEditDetails.CATEGORY.forEach(x => {
      control.push(this.fb.group({ name: x.name, value: x.value }))
    });


  }

  EditCategory() {
    this.editreq.id = this.CategoryEditDetails._id
    this.editreq.body = this.CategoryForm.value;
    this._productService._editCategory(this.editreq).subscribe(res => {
      if (res["status"]) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      }
    })
  }
  addcategory(): void {

    // <FormArray>this.orderForm.get('category').p ;
    this.items = this.CategoryForm.get('CATEGORY') as FormArray;
    this.items.push(this.fb.group({
      name: '',
      value: '',
    }));
    //  console.log(this.items);
    this.CategoryForm.controls.CATEGORY = this.items;

  }
  deletecat(index) {
    this.items = this.CategoryForm.get('CATEGORY') as FormArray;
    this.items.removeAt(index);

  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      value: '',
    });
  }




}
