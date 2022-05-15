import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'thank-you-page',
  templateUrl: './thank-you.component.html',
  styles: [
  ]
})
export class ThankYouComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    const orderData = this.ordersService.getCachedOrderData();
    this.ordersService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.ordersService.removeCachedOrderData();
    })
  }

}
