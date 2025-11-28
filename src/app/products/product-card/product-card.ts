import {
  ChangeDetectionStrategy,
  Component, contentChild,
  effect,
  ElementRef,
  input,
  Input,
  OnChanges,
  output,
  SimpleChanges, viewChild,
  ViewChild, viewChildren
} from '@angular/core';
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
  protected message = 'Change Message';

  readonly product = input<Product>();

  readonly showDetails = output<string>();

  // @ViewChild('myInput')
  // protected readonly myInput: ElementRef<HTMLInputElement> | undefined = undefined;
  protected readonly myInput = viewChild<ElementRef<HTMLInputElement>>('myInput');
  // protected readonly myInputs = viewChildren<ElementRef<HTMLInputElement>[]>(HTMLInputElement);
  protected readonly myChildProductId = contentChild<ElementRef<HTMLSpanElement>>('test');

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

  focusOn() {
    // this.myInput?.nativeElement?.focus();
    this.myInput()?.nativeElement?.focus();
    console.log('texte de mon content', this.myChildProductId()?.nativeElement.innerHTML);
  }
}
