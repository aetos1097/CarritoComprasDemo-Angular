import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interfasces/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  model ={
    name:'',
    store:'',
    shippingAddress:'',
    city:''
  };
  isDelivery = true;
  cart:Product[] = [];
  stores: Store[] = []
  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService){

  }
  ngOnInit():void{
    this.getStores();
    this.getDataCart();
    this.prepareDetails(); 
  }
  onPickupOrDelivery(value:boolean): void{
    this.isDelivery = value;
  }
  onSubmit({value: formData}: NgForm): void{
    console.log('guardar', formData);
    const data: Order = {
      ...formData,
      date:this.getCurrentDate(),
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data).
    pipe(
      tap(res =>console.log('order =>', res)),
      switchMap((order)=>{
        const details = this.prepareDetails();
        const orderId = order.id;
        return this.dataSvc.saveDetailOrder({details, orderId});
      }),
      tap(res =>console.log('Finish =>', res)),
    )
    .subscribe();
  }
 private getStores():void{
    this.dataSvc.getStores().
    pipe(tap(
      (stores: Store []) => this.stores = stores )).subscribe()
  }
  private getCurrentDate():String{
    return new Date().toLocaleDateString();
  }
  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach((product : Product)=>{
      const{ id: productId, name: productName, qty:quantity, stock}= product;
      details.push({productId,productName,quantity});
    })
    return details;
  }

  private getDataCart(): void{
    this.shoppingCartSvc.cartAction$.pipe(
      tap((products: Product[])=> this.cart = products)
    )
    .subscribe()
  }
}
