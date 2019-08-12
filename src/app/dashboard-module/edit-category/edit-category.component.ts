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
      type: this.fb.group({
        CATEGORY: this.fb.array([]),
      }),
      ID: "",
      TYPE: "",
      ISDELETED: false
    });

    if (this.sharedService.EditDetails) {
      this.CategoryEditDetails = this.sharedService.CategoryDetails;
      this.patch()
    } else {
      this._productService._getCategoryById(this.catid).subscribe(res => {
        this.CategoryEditDetails = res["data"];
        this.patch()
      })
    }
  }
  patch() {
    this.CategoryForm.patchValue({
      TYPE: this.CategoryEditDetails.TYPE,
      ID: this.CategoryEditDetails._id

    })
    const control = <FormArray>this.CategoryForm.get('type.CATEGORY');
    this.CategoryEditDetails.CATEGORY.forEach(x => {
      control.push(this.patchValues(x.name, x.value))
    })
  }
  patchValues(label, value) {
    return this.fb.group({
      name: [label],
      value: [value]
    })
  }

  
  EditCategory() {
    this.editreq.id = this.CategoryEditDetails._id
   
    var obj =
    {
      ID:this.CategoryForm.value.ID,
      ISDELETED:this.CategoryForm.value.ISDELETED,
      TYPE:this.CategoryForm.value.TYPE,
      CATEGORY:this.CategoryForm.value.type.CATEGORY,

    }

    this.editreq.body =obj ;
    // console.log(this.editreq.body);
    this._productService._editCategory(this.editreq).subscribe(res => {
      if (res["status"]) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      }
    })
  }
  addcategory(): void {

    this.items = this.CategoryForm.get('type.CATEGORY') as FormArray;
    this.items.push(this.fb.group({
      name: '',
      value: '',
    }));

    this.CategoryForm.controls.CATEGORY = this.items;

  }
  deletecat(index) {
    this.items = this.CategoryForm.get('type.CATEGORY') as FormArray;
    this.items.removeAt(index);

  }
  createItem(): FormGroup {
    return this.fb.group({
      name: '',
      value: '',
    });
  }




}
