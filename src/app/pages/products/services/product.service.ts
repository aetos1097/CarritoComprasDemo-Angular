import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfasces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURl='http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURl);
  }

  updateStock(productId: number, stock:number):Observable<any>{
    const body ={"stock": stock};
    return this.http.patch<any>(`${this,this.apiURl}/${productId}`,body)
  }
}
