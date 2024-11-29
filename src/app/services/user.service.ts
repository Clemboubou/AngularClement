import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private nameSubject = new BehaviorSubject<string | null>(localStorage.getItem('name'));
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));

  name$ = this.nameSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  updateUserInfo(name: string, role: string): void {
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    this.nameSubject.next(name);
    this.roleSubject.next(role);
  }

  clearUserInfo(): void {
    localStorage.clear();
    this.nameSubject.next(null);
    this.roleSubject.next(null);
  }
}
