import { ChangeDetectionStrategy, Component, effect, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard implements OnChanges {
  @Input() title: string = '';
  protected isFirstChange = true;

  readonly product = input<Product>();

  readonly showDetails = output<string>();

  constructor() {
    effect(() => {
      if (this.isFirstChange) {
        this.product();
        console.log('do stuff after product nth change (but not first one at init)');
      }
      this.isFirstChange = false;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['title']?.isFirstChange()) {
      console.log('do stuff after title nth change (but not first one at init)');
    }
  }
}
