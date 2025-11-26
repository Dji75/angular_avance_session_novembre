import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { combineLatest, interval, map, Observer, of, ReplaySubject, take, timer } from 'rxjs';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, session_novembre');
  });

  it('should test', () => {
    const simple$ = of(1, 2, 3);

    const observer: Observer<number> = {
      next: x => console.log('Valeur reçue: ' + x),
      error: err => console.error('Erreur: ' + err),
      complete: () => console.log('Observable complété')
    };

    simple$.subscribe(observer);
  });

  it('should test', () => {
    const timer$ = interval(1000); // Émet toutes les secondes
    const monObservable$ = timer$.pipe(map(x => {
      console.log('ici');
      return x * 10;
    }))

    const subscription = monObservable$.subscribe(x => console.log(x));
    const subscription2 = monObservable$.subscribe();

    // Plus tard, pour annuler la souscription
    setTimeout(() => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      console.log('Souscription annulée');
    }, 5000);
  });

  it('should test ReplaySubject', () => {
    // Stocke les 2 dernières valeurs
    const replaySubject = new ReplaySubject(2);

    replaySubject.next('Première valeur');
    replaySubject.next('Deuxième valeur');
    replaySubject.next('Troisième valeur');

    // Reçoit les 2 dernières valeurs: 'Deuxième valeur' et 'Troisième valeur'
    replaySubject.subscribe({
      next: (val) => console.log('Nouvel abonné:', val),
      complete: () => console.log('complete')
    });

    replaySubject.next('Quatrième valeur');

    replaySubject.complete();
  });

  it('should combineLatest', () => {
    const first$ = timer(1500, 1000).pipe(take(3));
    const second$ = timer(500, 1000).pipe(take(3));

    combineLatest([first$, second$]).subscribe(
      ([first, second]) => console.log(`Combiné: ${first}, ${second}`)
    );
  });

  it('should array reduce', () => {
    const array = [1, 3 , 7, 9]
    const result = array.reduce((previous, current) => {
      return {
        ...previous,
        accResult: previous.accResult + current,
      }
    } , { accResult: 0, anotherOne: 'test' })
  });
});
