// shared/services/auth.api.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  readonly #isAuthenticated = signal(false);
  readonly isLoggedIn = this.#isAuthenticated.asReadonly();

  login(username: string, password: string): boolean {
    // Logique simplifiée pour simuler l'authentification
    if (username === 'admin' && password === 'password') {
      this.#isAuthenticated.set(true);
    }
    return this.isLoggedIn();
  }

  logout(): void {
    this.#isAuthenticated.set(false);
  }

  getToken(): string {
    return 'fake-token';
  }
}
