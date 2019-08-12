import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProductsService} from '../Services/products/products.service';
import { Router} from '@angular/router';
import {SharedService} from '../../-shared-module/sharedServices/shared.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers:[ProductsService]
})
export class CategoryListComponent implements OnInit {

  public categories=[];
  public maxcolspan;
  
  
  constructor(public sharedService:SharedService,public router:Router,private _productService:ProductsService,private fb: FormBuilder,public db: AngularFireDatabase) { 
  }

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList(){
    this._productService._getCategoryList().subscribe(res=>{
      var response = res;
      if(response["status"]){
        this.categories=response["data"];
        var categories=[];
        if(this.categories.length>0){
          for(var i=0;i<this.categories.length;i++){
            categories=[];
            categories= this.categories[i].CATEGORY;
            this.categories[i].colspan=categories.length;
            if(this.maxcolspan){
              if(this.categories[i].colspan>this.maxcolspan){
                this.maxcolspan= this.categories[i].colspan;
              }
            }else{
              this.maxcolspan= this.categories[i].colspan
            }
            this.categories[i].restspan= this.maxcolspan- this.categories[i].colspan;
            
          }
        }
      }
    })
  }
  edit(cat){
   this.sharedService.CategoryDetails=cat;
    this.router.navigateByUrl('/Dashboard/Product/Categories/edit/'+cat._id);
  }
  Delete(cat){

  this._productService._removeCategory(cat._id).subscribe(res=>{
    console.log(res);
  })
  }

}
