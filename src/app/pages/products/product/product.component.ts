
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { Product } from '../interfasces/product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCardClick = new EventEmitter<Product>();
  // constructor(){}

  // ngOnInit(): void {
      
  // }
  onClick(): void {
    // console.log('Click', this.product);
    this.addToCardClick.emit(this.product);
  }
}
