import { Component,OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from './interfasces/product.interface';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  template:`
      <section class="products">
      <app-product 
      (addToCardClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of products"></app-product>
      </section>`,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products!: Product[];
  //para poder llamaer metodos se deben inyectar en el constructor
  constructor(private productSvc: ProductService, private shoppingCartSvc: ShoppingCartService){}
  ngOnInit():void{
    this.productSvc.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products)
    )
    .subscribe();
  }
  addToCart(product: Product): void {
    console.log('Add to Cart', product);
    this.shoppingCartSvc.updateCart(product);
  }
}
