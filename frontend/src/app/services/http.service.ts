import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface RegisterRequest {
  email: string,
  password: string,
}
export interface LoginRequest extends RegisterRequest {
  rememberMe: boolean,
}

export interface AuthResponse {
  statusCode: number,
  message: string,
}

export interface LoginResponse extends AuthResponse{
  email: string,
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl: string;
  constructor(
    private readonly http: HttpClient,
  ) {
    this.baseUrl = 'http://localhost:8080';
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    const url: string = `${this.baseUrl}/login`;
    return this.http.post<LoginResponse>(url, request);
  }

  public register(request: RegisterRequest): Observable<AuthResponse> {
    const url: string = `${this.baseUrl}/register`;
    return this.http.post<AuthResponse>(url, request);
  }

  public logout(): Observable<AuthResponse> {
    const url: string = `${this.baseUrl}/logout`;
    return this.http.post<AuthResponse>(url, {});
  }
}
