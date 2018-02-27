import { Component, OnInit ,ViewChild,Renderer,ElementRef,ContentChildren,TemplateRef } from '@angular/core';
// import { ProductsService} from '../Services/products/products.service';
import { Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthServiceService} from '../../-shared-module/AuthService/auth-service.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { parse } from 'querystring';
import {SharedService} from '../../-shared-module/sharedServices/shared.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
public  items=[];

  constructor(public _router:Router,private modalService: BsModalService,public _authService:AuthServiceService,public db: AngularFireDatabase,public _sharedService:SharedService,public router:Router) {
  
  } 
    
  ngOnInit() {
  if(this._sharedService.OrderDetals.length>0){
   this.items=this._sharedService.OrderDetals;
  }
  }

}
