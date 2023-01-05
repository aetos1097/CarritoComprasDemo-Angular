import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfasces/product.interface';
@Injectable(
    {providedIn: 'root'}
)
export class ShoppingCartService{
    products: Product[] =[];//array vacio

    private cartSubject = new Subject<Product[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }
    //metodo para acceder a lso metodos privados
    updateCart(product:Product):void{
        this.addToCart(product);
        this,this.quantityProducts();
        this.calcTotal();

    }
    //add compra
    private addToCart(product:Product):void{
        this.products.push(product);
        this.cartSubject.next(this.products);
    }

    //cantidad de productos aderidos
    private quantityProducts(): void{
        const quantity = this.products.length;
        this.quantitySubject.next(quantity);
    }

    private calcTotal(): void{
        const total = this.products.reduce((acc,prod)=> acc +=prod.price, 0);
        this.totalSubject.next(total);
    }
    

}
