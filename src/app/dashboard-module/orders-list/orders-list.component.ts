import { Component, OnInit, ViewChild, Renderer, ElementRef, ContentChildren, TemplateRef } from '@angular/core';
// import { ProductsService} from '../Services/products/products.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService } from '../../-shared-module/AuthService/auth-service.service';
import { Observable } from 'rxjs/Observable';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { parse } from 'querystring';
import { SharedService } from '../../-shared-module/sharedServices/shared.service';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  itemsRef: AngularFireList<any>;
  clientRef: AngularFireList<any>;
  items: Observable<any[]>;
  clientDetails: any;
  clientAddress:any;
  modalRef: BsModalRef;
  public app: any;
  public firebase: any;
  index=0;


  constructor(public _router: Router, private modalService: BsModalService, public _authService: AuthServiceService, public db: AngularFireDatabase, public _sharedService: SharedService, public router: Router) {
    this.itemsRef = db.list('Orders');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

   
    
  }

  ngOnInit() {
  }
  orderDetails(obj) {
    this._sharedService.OrderDetals = obj.order_details;
    this._router.navigateByUrl('/Dashboard/Orders/Details');
    console.log(obj.order_details);
  }

  clientInfo(template: TemplateRef<any>, item) {
    var object: any;
    // const ref = this.app.database().ref('Clients/' + item.client_id)
    // ref.once('value', (snapshot) => {
    //   this.clientDetails = snapshot.val();
    //   console.log(this.clientDetails);
    // })
    console.log(item);
    this.index=item.addressSelected;
    this.db.list('Clients/' + item.client_id).valueChanges().subscribe(value=>{
      this.clientDetails=value;
      console.log(this.clientDetails);
      var temp =value[0];
      this.clientAddress= temp[this.index];
      console.log(this.clientAddress);
    });
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

}
