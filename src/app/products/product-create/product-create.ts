import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.scss',
})
export default class ProductCreate implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #destroyRef = inject(DestroyRef);

  readonly form = this.#fb.group({
    title: ['', [Validators.required], [/* async validators */]],
    description: this.#fb.control({ value: '', disabled: true }, [Validators.required], [/* async validators */]),
  });

  ngOnInit(): void {
    this.form.controls.title.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.#destroyRef)).subscribe((v)=> {
      console.log('nouvelle valeur');
      if (v) {
        this.form.controls.description.enable();
      }
    })
  }
}
