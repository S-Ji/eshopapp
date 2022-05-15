import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService, ORDER_STATUS } from '@eshopapp/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus();
  }

  private _mapOrderStatus() {
    this.orderStatuses =  Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });

  }

  private _getOrder() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
        })
      }
    });
    
  }

  onStatusChange(event) {
    this.orderService.updateOrder({status: event.value}, this.order.id).subscribe(order => {
      this.messageService.add({
        severity:'success', 
        summary:'Success', 
        detail:'Status is updated'});
        timer(2000).toPromise().then(done => {
          this.location.back();
        })
    },
    (error) => {
      this.messageService.add({
        severity:'error', 
        summary:'Error', 
        detail:'Status is not updated'});
    });
  }

}
