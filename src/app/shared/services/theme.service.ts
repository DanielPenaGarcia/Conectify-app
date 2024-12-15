import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = '';
  private themeSubject = new BehaviorSubject<string>('dark-light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.setTheme(savedTheme || 'dark-light');
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme: string) {
    if (this.currentTheme) {
      document.body.classList.remove(this.currentTheme);
    }
    document.body.classList.add(theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme); // Notifica a los observadores
  }
}
