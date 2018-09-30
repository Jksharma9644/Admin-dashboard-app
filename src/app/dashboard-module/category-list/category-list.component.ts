import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  orderForm: FormGroup;
  items: FormArray;
  itemsRef: AngularFireList<any>;
  itemsList: Observable<any[]>; 
  constructor(public db: AngularFireDatabase) { 
    this.itemsRef = db.list('productsCategories');
    this.itemsList = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ngOnInit() {
  }

}
