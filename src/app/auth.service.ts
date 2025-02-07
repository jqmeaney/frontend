// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userManager: UserManager;
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'https://your-oidc-provider.com',
      client_id: 'your-client-id',
      redirect_uri: window.location.origin + '/callback',
      response_type: 'code',
      scope: 'openid profile email',
    };
    this.userManager = new UserManager(settings);
    this.userManager.getUser().then(user => this.userSubject.next(user));
  }

  get user() {
    return this.userSubject.asObservable();
  }

  login() {
    this.userManager.signinRedirect();
  }

  logout() {
    this.userManager.signoutRedirect();
  }
}