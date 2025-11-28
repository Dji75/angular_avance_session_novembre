import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  inject, Injector,
  linkedSignal,
  OnInit,
  signal,
  untracked
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutePaths } from '../../products/product-routes';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { httpResource, HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  #destroyRef = inject(DestroyRef);
  #cdRef = inject(ChangeDetectorRef);
  injector = inject(Injector);

  protected readonly RoutePaths = RoutePaths;
  compteur: number = 0;

  signalCpt = signal(0);

  // nestedSignals = computed(() => ({
  //   id: signal('5'),
  //   count: this.signalCpt,
  //   name: signal('toto'),
  //   description: signal('my tiny house'),
  // }));


  optionsLivraison = signal(['Standard', 'Express', 'International']);
  optionSelectionnee = linkedSignal<string[], string>({
    source: this.optionsLivraison,
    computation:
      (nextList, previousValue) => {
        if (previousValue && nextList.includes(previousValue.value)) {
          return previousValue.value;
        }

        return nextList[0];
      }
  });

  /*utilisateur = httpResource<object>(() => `/api/utilisateurs/${this.signalCpt()}`);
  utilisateur2 = httpResource.blob(() => ({
    url: `/api/utilisateurs/${this.signalCpt()}`,
    method: 'POST',
    headers: {

    },
    params: {

    },
    body: { }
  }));*/


  // productsSignal: HttpResourceRef<any[] | undefined> | undefined = undefined;
  productsSignal= httpResource<any[]>(() => ({
    url: `https://fakestoreapi.com/products?title=${this.monFiltre()}`
  }));

  monFiltre = signal('');

  constructor() {
    effect(() => {
      console.log('on passe dans effect');
      // this.signalCpt();
      // this.signalCpt();
      // this.signalCpt();
      const options = untracked(() => this.optionsLivraison());

      if (this.signalCpt()) {
        this.optionsLivraison();
      }
    })
  }

  ngOnInit(): void {
    console.log('');
    timer(1000).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe(() => {
      this.compteur++;
      this.#cdRef.markForCheck();
    });

    timer(1000).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((v) => {
      this.signalCpt.set(this.signalCpt() + 1);
    })

    timer(5000).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((v) => {
      this.optionsLivraison.set([]);
    })

    this.signalCpt.update((old) => {
      console.log('old ?', old)
      return old + 4;
    });

    console.log(this.optionSelectionnee()); // 'Standard'

    // On peut modifier la valeur du linkedSignal
    this.optionSelectionnee.set('Express');
    console.log(this.optionSelectionnee()); // 'Express'

    // Si la source change, linkedSignal est mis à jour automatiquement
    this.optionsLivraison.set(['Email', 'Retrait en magasin', 'Livraison à domicile']);
    console.log(this.optionSelectionnee()); // 'Email' (reset à la première option)
  }

  loadProducts() {
    this.productsSignal.reload();
  }

  updateFiltre(target: EventTarget | null) {
    this.monFiltre.set((target as HTMLInputElement)?.value ?? '');
  }
}
