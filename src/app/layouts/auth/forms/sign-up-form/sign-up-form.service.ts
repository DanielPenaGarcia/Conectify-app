import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpData, UserCreated } from './sign-up-form.types';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  constructor(
    private readonly http: HttpClient
  ) { }

  signUp(data: SignUpData): Observable<UserCreated> {
    return this.http.post<UserCreated>(`${environment.api}/users`, data);
  }
}
